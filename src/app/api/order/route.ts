import { authenticateToken } from "@/lib/auth";
import { pusher } from "@/lib/Pusher";
import prisma from "@/prisma/client";
import { authCustomer } from "@/utils/Auth";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-12-18.acacia" as any, // Giữ phiên bản ổn định
});
export async function GET(req: NextRequest) {
  // const searchParams = req.nextUrl.searchParams;
  // const search = searchParams.get("search") || "";
  // const page: number = Number(searchParams.get("page")) || 1;
  // const limit = Number(searchParams.get("limit")) || 1;

  // // totalrecord
  // const totalrecord = await prisma.order.count();
  // const totalPage = totalrecord / limit;
  // const totalSkipRecord = (page - 1) * limit;

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Vui lòng đăng nhập" },
      { status: 404 }
    );
  }
  const user = await authenticateToken(token);
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
    // quản lý đơn hàng

    const hashAdmin = user?.some(
      (item) => item.permission.permission === "update"
    );
    if (!hashAdmin)
      return NextResponse.json(
        { message: "bạn không có quyền truy cập" },
        { status: 400 }
      );
    const manageOrder = await prisma.order.findMany({
      select: {
        order_id: true,
        order_date: true,
        total_amount: true,
        order_state: true,
        Customer: {
          select: {
            name: true,
            email: true,
          },
        },
        Payments: {
          select: {
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
      { orders, manageOrder, message: "Lấy danh sách đơn hàng thành công." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { addressId, paymentMethod, finalTotal } = await req.json();

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "Vui lòng đăng nhập" },
      { status: 404 }
    );
  }

  try {
    const customer = await authCustomer(req);
    if (!customer) {
      return NextResponse.json(
        { message: "vui lòng đăng nhập" },
        { status: 400 }
      );
    }

    const address = await prisma.addressShipper.findUnique({
      where: { address_id: addressId, customer_id: customer?.customer_id },
    });
    if (!address) {
      return NextResponse.json(
        { message: "Địa chỉ giao hàng không hợp lệ" },
        { status: 400 }
      );
    }

    const cart = await prisma.cart.findFirst({
      where: { customer_id: customer?.customer_id },
      include: { CartItems: { include: { Product: true, Size: true } } },
    });
    if (!cart || cart.CartItems.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty or does not exist." },
        { status: 400 }
      );
    }

    // Sử dụng finalTotal từ frontend làm totalAmount
    const totalAmount = Number(finalTotal);
    if (isNaN(totalAmount) || totalAmount < 0) {
      return NextResponse.json(
        { message: "Tổng tiền không hợp lệ" },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        customer_id: customer.customer_id,
        address_id: addressId,
        order_date: new Date(),
        total_amount: totalAmount, // Sử dụng finalTotal trực tiếp
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

    if (paymentMethod === "CREDIT_CARD") {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(totalAmount),
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

    await prisma.payment.create({
      data: {
        order_id: order.order_id,
        payment_method: paymentMethod,
        payment_amount: totalAmount,
        payment_status: "PENDING",
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
      { order, message: "Đặt hàng thành công" },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 501 });
  }
}
