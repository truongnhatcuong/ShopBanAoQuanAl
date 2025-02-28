import prisma from "@/prisma/client";
import { authCustomer } from "@/utils/Auth";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const search = searchParams.get("search") || "";
  const page: number = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 1;

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

    const orders = await prisma.order.findMany({
      where: {
        customer_id: customer?.customer_id,
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

    if (orders.length === 0) {
      return NextResponse.json(
        { message: "Không có đơn hàng nào." },
        { status: 404 }
      );
    }

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

    const costShipping = 25000;
    const subtotal = cart.CartItems.reduce((total, item) => {
      return total + item.quantity * Number(item.Product.price);
    }, 0);

    let totalAmount = subtotal + costShipping;
    let discount = 0;

    if (couponCode) {
      const coupon = await prisma.coupon.findFirst({
        where: {
          coupon_code: couponCode.toUpperCase(),
        },
      });

      if (coupon) {
        const currentDate = new Date();
        const startDate = coupon.start_date
          ? new Date(coupon.start_date)
          : new Date();
        const endDate = coupon.end_date
          ? new Date(coupon.end_date)
          : new Date();

        if (currentDate < startDate || currentDate > endDate) {
          return NextResponse.json(
            { message: "Mã giảm giá đã hết hạn." },
            { status: 400 }
          );
        }

        if (coupon.coupon_percentage && Number(coupon.coupon_percentage) > 0) {
          discount = (subtotal * Number(coupon.coupon_percentage)) / 100;
        }

        if (discount === 0 && coupon.coupon_amount) {
          discount = Number(coupon.coupon_amount);
        }

        if (discount > totalAmount) {
          discount = totalAmount;
        }

        totalAmount -= discount;
      }
    }

    // Create order in database
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

    // Handle different payment methods
    if (paymentMethod === "CREDIT_CARD") {
      // Create Stripe payment session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: cart.CartItems.map((item) => ({
          price_data: {
            currency: "vnd",
            product_data: {
              name: item.Product.product_name,
            },
            unit_amount: Number(totalAmount),
          },
          quantity: item.quantity,
        })),
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order/cancel`,
        metadata: {
          order_id: order.order_id,
        },
      });

      // Create payment record with Stripe session ID
      await prisma.payment.create({
        data: {
          order_id: order.order_id,
          payment_method: "CREDIT_CARD",
          payment_amount: totalAmount,
          payment_status: "PENDING",
          stripe_session_id: session.id,
        },
      });

      // Clean up cart
      await prisma.cartItem.deleteMany({
        where: { cart_id: cart.cart_id },
      });

      await prisma.cart.delete({
        where: { cart_id: cart.cart_id },
      });

      // Return Stripe session URL
      return NextResponse.json(
        {
          order,
          stripe_session_url: session.url,
          message: "Đơn hàng đã được tạo, chuyển đến trang thanh toán",
        },
        { status: 201 }
      );
    } else {
      // Handle regular card payment
      await prisma.payment.create({
        data: {
          order_id: order.order_id,
          payment_method: paymentMethod,
          payment_amount: totalAmount,
          payment_status: "PENDING",
        },
      });

      // Clean up cart
      await prisma.cartItem.deleteMany({
        where: { cart_id: cart.cart_id },
      });

      await prisma.cart.delete({
        where: { cart_id: cart.cart_id },
      });

      return NextResponse.json(
        {
          order,
          message: "Đặt hàng thành công",
        },
        { status: 201 }
      );
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 501 });
  }
}
