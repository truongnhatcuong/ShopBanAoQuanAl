import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "";
// Hàm GET
export async function GET(
  req: NextRequest,
  { params }: { params: { card_id: string } }
) {
  const cardId = parseInt(params.card_id);
  if (isNaN(cardId)) {
    return NextResponse.json({ message: "Invalid card_id" }, { status: 400 });
  }

  try {
    const getCard = await prisma.cart.findUnique({
      where: {
        cart_id: cardId,
      },
    });

    if (!getCard) {
      return NextResponse.json(
        { message: `Cart with id ${cardId} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { getCard, message: `Get card id ${cardId} success` },
      { status: 200 }
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
  // Lấy token từ cookies
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Token không có sẵn" },
      { status: 404 }
    );
  }
  const decoded: any = jwt.verify(token, JWT_SECRET);
  const username = decoded.username;
  if (!username) {
    return NextResponse.json({ message: "Username error" }, { status: 404 });
  }
  const customer = await prisma.customer.findUnique({
    where: { username },
    select: { customer_id: true },
  });
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
