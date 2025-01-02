import prisma from "@/prisma/client";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET: string = process.env.JWT_SECRET || "";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Vui lòng đăng nhập" },
      { status: 404 }
    );
  }

  try {
    // Giải mã token để lấy thông tin người dùng
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const username = decoded.username;

    if (!username) {
      return NextResponse.json(
        { message: "Username không xác thực" },
        { status: 404 }
      );
    }

    // Tìm khách hàng trong cơ sở dữ liệu dựa trên username
    const customer = await prisma.customer.findUnique({
      where: { username },
    });

    if (!customer) {
      return NextResponse.json(
        { message: "Khách hàng không tồn tại" },
        { status: 404 }
      );
    }

    // Lấy tất cả đơn hàng của khách hàng này

    const orders = await prisma.order.findMany({
      where: {
        customer_id: customer.customer_id, // Lọc theo customer_id
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
    });

    // Kiểm tra nếu không có đơn hàng nào
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
  const { customerId, addressId, paymentMethod } = await req.json();

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "vui lòng đăng nhập " },
      { status: 404 }
    );
  }

  try {
    // Mã hóa token
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const username = decoded.username;

    if (!username) {
      return NextResponse.json(
        { message: "username không xác thực" },
        { status: 404 }
      );
    }

    const customer = await prisma.customer.findUnique({
      where: { username },
    });

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

    const totalAmount = cart.CartItems.reduce((total, item) => {
      return total + item.quantity * Number(item.Product.price);
    }, 0);

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
