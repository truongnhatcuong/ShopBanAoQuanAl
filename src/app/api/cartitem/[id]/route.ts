import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const cartItemId = Number(params.id);
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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const cartItemId = Number(params.id);
  const data = await req.json();
  try {
    const updateCartitem = await prisma.cartItem.update({
      where: {
        cartitem_id: cartItemId,
      },
      data: {
        cart_id: data.cart_id,
        product_id: data.product_id,
        quantity: data.quantity,
      },
    });
    return NextResponse.json(
      { updateCartitem, message: `found Id ${cartItemId} success` },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const cartItemId = Number(params.id);
  try {
    const deletedCartitem = await prisma.cartItem.delete({
      where: {
        cartitem_id: cartItemId,
      },
    });
    return NextResponse.json(
      { deletedCartitem, message: `found Id ${cartItemId} success` },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
