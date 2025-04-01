import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { authCustomer } from "@/utils/Auth";
const JWT_SECRET = process.env.JWT_SECRET || "";
// Hàm GET
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const cartItemId = Number(id);
  try {
    const getcartitem = await prisma.cartItem.findUnique({
      where: {
        cartitem_id: cartItemId,
      },
    });
    return NextResponse.json(
      { getcartitem, message: `found Id ${cartItemId} success` },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// xóa
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  const cartItemId = Number(id);
  const customer = await authCustomer(req);
  if (!customer) {
    return NextResponse.json(
      { message: "vui lòng đăng nhập" },
      { status: 400 }
    );
  }
  try {
    // Kiểm tra sự tồn tại của sản phẩm trong giỏ hàng
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        Cart: { customer_id: customer?.customer_id },
        cartitem_id: cartItemId,
      },
    });
    if (!cartItem) {
      return NextResponse.json(
        { message: "Sản phẩm không có trong giỏ hàng" },
        { status: 404 }
      );
    }
    await prisma.cartItem.delete({
      where: { cartitem_id: cartItem.cartitem_id },
    });
    return NextResponse.json(
      { message: "Sản phẩm đã được xóa khỏi giỏ hàng" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const cartItemId = Number(id);
  const { quantity } = await req.json();
  try {
    if (!cartItemId || quantity < 1) {
      return NextResponse.json(
        { message: "Dữ liệu không hợp lệ" },
        { status: 400 }
      );
    }
    const customer = await authCustomer(req);
    if (!customer) {
      return NextResponse.json(
        { message: "vui lòng đăng nhập" },
        { status: 400 }
      );
    }

    // xác minh quyền sở hữu
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        cartitem_id: cartItemId,
        Cart: {
          customer_id: customer.customer_id,
        },
      },
    });

    if (!cartItem) {
      return NextResponse.json(
        { message: "Không tìm thấy sản phẩm trong giỏ hàng của bạn" },
        { status: 404 }
      );
    }
    // Kiểm tra số lượng tồn kho của sản phẩm
    const productSize = await prisma.productSize.findUnique({
      where: {
        product_id_size_id: {
          product_id: cartItem.product_id,
          size_id: cartItem.size_id,
        },
      },
    });

    if (!productSize || productSize.stock_quantity < quantity) {
      return NextResponse.json(
        { message: "Số lượng yêu cầu vượt quá tồn kho của sản phẩm" },
        { status: 400 }
      );
    }
    if (quantity < 1) {
      return NextResponse.json(
        { message: "số lượng ít nhất là 1" },
        { status: 400 }
      );
    }

    const updateCartItem = await prisma.cartItem.update({
      where: {
        cartitem_id: cartItemId,
      },
      data: {
        quantity,
      },
    });

    return NextResponse.json(
      { message: "Cập nhật thành công", data: updateCartItem },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
