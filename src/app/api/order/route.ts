import { pusher } from "@/lib/Pusher";
import prisma from "@/prisma/client";
import { authCustomer } from "@/utils/Auth";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16" as any, // Giữ phiên bản ổn định
});
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const search = searchParams.get("search") || "";
  const page: number = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 1;

  // totalrecord
  const totalrecord = await prisma.order.count();
  const totalPage = totalrecord / limit;
  const totalSkipRecord = (page - 1) * limit;

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Vui lòng đăng nhập" },
      { status: 404 }
    );
  }

  try {
    const customer = await authCustomer(req);

    // Lấy tất cả đơn hàng của khách hàng này

    const orders = await prisma.order.findMany({
      where: {
        customer_id: customer?.customer_id, // Lọc theo customer_id
      },
      include: {
        OrderItems: {
          include: {
            Product: {
              include: {
                Brand: true,
                Images: {
                  take: 1,
                },
              },
            },
            Size: true,
          },
        },
      },
      orderBy: {
        order_date: "desc",
      },
    });

    // Kiểm tra nếu không có đơn hàng nào
    if (orders.length === 0) {
      return NextResponse.json(
        { message: "Không có đơn hàng nào." },
        { status: 404 }
      );
    }
    // admin
    const orderCustomer = await prisma.order.findMany({
      include: {
        Customer: {
          select: {
            name: true,
            email: true,
          },
        },
        Payments: {
          select: {
            payment_id: true,
            payment_status: true,
            payment_method: true,
          },
        },
      },
      orderBy: {
        order_id: "desc",
      },
    });

    return NextResponse.json(
      { orders, message: "Lấy danh sách đơn hàng thành công." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { customerId, addressId, paymentMethod, couponCode } = await req.json();
  console.log("Request body:", {
    customerId,
    addressId,
    paymentMethod,
    couponCode,
  });
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "vui lòng đăng nhập " },
      { status: 404 }
    );
  }

  try {
    const customer = await authCustomer(req);

    if (!customerId) {
      return NextResponse.json(
        { message: "vui lòng điền thông tin địa chỉ" },
        { status: 400 }
      );
    }

    //kiểm tra địa chỉ
    const address = await prisma.addressShipper.findUnique({
      where: {
        address_id: addressId,
        customer_id: customerId,
      },
    });

    if (!address) {
      return NextResponse.json(
        { message: "Địa chỉ giao hàng không hợp lệ" },
        { status: 400 }
      );
    }
    // Lấy thông tin giỏ hàng
    const cart = await prisma.cart.findFirst({
      where: {
        customer_id: customer?.customer_id,
      },
      include: { CartItems: { include: { Product: true, Size: true } } },
    });
    if (!cart || cart.CartItems.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty or does not exist." },
        { status: 400 }
      );
    }
    // phí vận chuyển mặc định
    const costShipping = 25000;
    const subtotal = cart.CartItems.reduce((total, item) => {
      return total + item.quantity * Number(item.Product.price);
    }, 0);
    // Tính tổng tiền trước khi áp dụng mã giảm giá
    let totalAmount = subtotal + costShipping;

    if (couponCode) {
      const coupon = await prisma.coupon.findFirst({
        where: { coupon_code: couponCode },
      });

      if (coupon) {
        const startDate = coupon.start_date
          ? new Date(coupon.start_date)
          : new Date();
        const endDate = coupon.end_date
          ? new Date(coupon.end_date)
          : new Date();
        const currentDate = new Date();
        if (currentDate < startDate || currentDate > endDate) {
          return NextResponse.json(
            { message: "Mã giảm giá đã hết hạn." },
            { status: 400 }
          );
        }

        let discount = 0;
        if (coupon.coupon_percentage && Number(coupon.coupon_percentage) > 0) {
          discount = (subtotal * Number(coupon.coupon_percentage)) / 100;
        } else if (coupon.coupon_amount) {
          discount = Number(coupon.coupon_amount);
        }

        discount = Math.min(discount, subtotal); // Giảm tối đa chỉ bằng tổng tiền hàng
        totalAmount = subtotal + costShipping - discount;

        console.log("Coupon Applied:", {
          couponCode,
          discount,
          totalAmount,
        });
      }
    }

    const order = await prisma.order.create({
      data: {
        customer_id: customerId,
        address_id: addressId,
        order_date: new Date(),
        total_amount: totalAmount,
        order_state: "PENDING",
        created_at: new Date(),
        OrderItems: {
          create: cart.CartItems.map((item) => ({
            product_id: item.product_id,
            quantity: item.quantity,
            price: Number(item.Product.price),
            size_id: item.size_id,
          })),
        },
      },
    });
    //stripe
    if (paymentMethod === "CREDIT_CARD") {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(Number(totalAmount)),
        currency: "vnd",
        metadata: { order_id: order.order_id.toString() },
        description: `Thanh toán đơn hàng #${order.order_id}`,
      });

      await prisma.payment.create({
        data: {
          order_id: order.order_id,
          payment_method: "CREDIT_CARD",
          payment_status: "PENDING",
          payment_amount: totalAmount,
          stripe_payment_intent: paymentIntent.id,
          created_at: new Date(),
        },
      });
      await prisma.cartItem.deleteMany({ where: { cart_id: cart.cart_id } });
      await prisma.cart.delete({ where: { cart_id: cart.cart_id } });
      await pusher.trigger("orders", "new-order", {
        orderId: order.order_id,
        customerName: customer?.name,
        totalAmount,
      });
      return NextResponse.json(
        {
          order,
          paymentIntentClientSecret: paymentIntent.client_secret,
          message: "Vui lòng hoàn tất thanh toán qua Stripe",
        },
        { status: 201 }
      );
    }
    //
    await prisma.payment.create({
      data: {
        order_id: order.order_id,
        payment_method: paymentMethod,
        payment_amount: totalAmount,
        payment_status: "PENDING",
      },
    });

    await prisma.cartItem.deleteMany({
      where: { cart_id: cart.cart_id },
    });

    await prisma.cart.delete({
      where: { cart_id: cart.cart_id },
    });

    await pusher.trigger("orders", "new-order", {
      orderId: order.order_id,
      customerName: customer?.name,
      totalAmount,
    });

    return NextResponse.json(
      {
        order,
        message: "Đặt hàng thành công",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ message: error.message }, { status: 501 });
  }
}
