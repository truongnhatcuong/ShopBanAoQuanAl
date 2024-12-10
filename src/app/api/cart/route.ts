import jwt from "jsonwebtoken";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET: string = process.env.JWT_SECRET || "";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "token không có sẵn" },
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
    if (!customer) {
      return NextResponse.json(
        { message: "Customer not found" },
        { status: 404 }
      );
    }

    const cart = await prisma.cart.findFirst({
      where: { customer_id: customer.customer_id },
      include: {
        CartItems: {
          include: {
            Product: {
              select: {
                ProductSizes: {
                  select: {
                    size_id: true,
                    stock_quantity: true,
                  },
                },
                product_name: true,
                price: true,
                Images: {
                  take: 1,
                  select: { image_url: true }, // Lấy một hình ảnh của sản phẩm
                },
              },
            },

            Size: {
              select: {
                name_size: true,
                // Lấy tên kích thước từ bảng Size
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      {
        cart: {
          cart_id: cart?.cart_id, // Lấy cart_id từ kết quả giỏ hàng
          items: cart?.CartItems.map((item) => ({
            cartitem_id: item.cartitem_id,
            product_id: item.product_id,
            quantity: item.quantity,
            selectedSize: item.Size?.name_size, // Cung cấp selectedSize từ bảng Size
            product: item.Product,
            image_url: item.Product.Images[0]?.image_url, // Lấy URL hình ảnh
          })),
        },
        message: "Success",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// tạo giỏ hàng
export async function POST(req: NextRequest) {
  // Lấy dữ liệu từ body request (product_id và quantity)
  const { product_id, quantity, size_id } = await req.json();
  // Lấy token từ cookies
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "token không có sẵn" },
      { status: 404 }
    );
  }
  // Giải mã token và lấy thông tin người dùng
  const decoded: any = jwt.verify(token, JWT_SECRET);
  const username = decoded.username;
  if (!username) {
    return NextResponse.json({ message: "username error" }, { status: 404 });
  }
  // Lấy thông tin khách hàng từ database dựa trên username
  const customer = await prisma.customer.findUnique({
    where: { username },
    select: { customer_id: true },
  });

  if (!customer) {
    return NextResponse.json(
      { message: "Customer not found" },
      { status: 404 }
    );
  }

  try {
    // Kiểm tra xem giỏ hàng đã tồn tại chưa trong database
    let cart = await prisma.cart.findFirst({
      where: {
        customer_id: customer?.customer_id,
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          customer_id: customer?.customer_id,
        },
      });
    }
    // Kiểm tra sản phẩm và kích thước tồn kho
    const productSize = await prisma.productSize.findUnique({
      where: { product_id_size_id: { product_id, size_id } },
    });
    if (!productSize || productSize.stock_quantity < quantity) {
      return NextResponse.json(
        {
          message: `Số Lượng trong kho chỉ còn ${productSize?.stock_quantity} sản phẩm`,
        },
        { status: 400 }
      );
    }

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const exsitCartIteam = await prisma.cartItem.findFirst({
      where: {
        cart_id: cart.cart_id,
        product_id: product_id,
        size_id: size_id,
      },
    });
    // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
    if (exsitCartIteam) {
      const updateCartItem = await prisma.cartItem.update({
        where: {
          cartitem_id: exsitCartIteam.cartitem_id,
        },
        data: {
          quantity: exsitCartIteam.quantity + quantity,
        },
      });
      return NextResponse.json(updateCartItem);
    }
    // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm vào giỏ hàng
    const newCartItem = await prisma.cartItem.create({
      data: {
        cart_id: cart.cart_id,
        product_id: product_id,
        size_id: size_id,
        quantity: quantity,
      },
    });

    return NextResponse.json(
      { newCartItem, message: "success" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
