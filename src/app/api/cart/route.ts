import jwt from "jsonwebtoken";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { authCustomer } from "@/utils/Auth";

export async function GET(req: NextRequest) {
  const customer = await authCustomer(req);
  if (!customer) {
    return NextResponse.json(
      { message: "Vui lòng đăng nhập trước khi thêm vào giỏ hàng" },
      { status: 404 }
    );
  }

  try {
    const cart = await prisma.cart.findFirst({
      where: { customer_id: customer.customer_id },
      include: {
        CartItems: {
          include: {
            Product: {
              select: {
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

    const totalQuantity =
      cart?.CartItems.reduce((total, item) => total + item.quantity, 0) || 0;

    // Tính tổng giá trị giỏ hàng
    const totalAmount =
      cart?.CartItems.reduce(
        (total, item) => total + Number(item.Product.price) * item.quantity,
        0
      ) || 0;

    return NextResponse.json(
      {
        cart: {
          cart_id: cart?.cart_id,
          items: cart?.CartItems.map((item) => ({
            cartitem_id: item.cartitem_id,
            product_id: item.product_id,
            quantity: item.quantity,
            selectedSize: item.Size?.name_size, // Cung cấp selectedSize từ bảng Size
            product: item.Product,
            image_url: item.Product.Images[0]?.image_url, // Lấy URL hình ảnh
          })),
          customer: customer.name,
          totalQuantity, // Trả về tổng số lượng sản phẩm
          totalAmount, // Trả về tổng giá trị giỏ hàng
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
  const customer = await authCustomer(req);
  if (!customer) {
    return NextResponse.json(
      { message: "Vui lòng đăng nhập trước khi thêm vào giỏ hàng" },
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
