import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const cardId = Number(params.id);
  try {
    const getCard = await prisma.cart.findUnique({
      where: {
        cart_id: cardId,
      },
    });
    return NextResponse.json(
      { getCard, message: `get id ${cardId} success` },
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
  const cardId = Number(params.id);
  const data = await req.json();
  try {
    const updateCard = await prisma.cart.update({
      where: {
        cart_id: cardId,
      },
      data: {
        customer_id: data.customer_id,
        updated_at: new Date(),
      },
    });
    return NextResponse.json(
      { updateCard, message: `updated success` },
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
  const cardId = Number(params.id);
  try {
    const deleteCart = await prisma.cart.delete({
      where: {
        cart_id: cardId,
      },
    });
    return NextResponse.json(
      { deleteCart, message: `deletded id ${cardId} success` },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
