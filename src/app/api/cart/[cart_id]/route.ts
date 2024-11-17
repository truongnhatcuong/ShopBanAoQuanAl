import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

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

// Hàm PUT
export async function PUT(
  req: NextRequest,
  { params }: { params: { card_id: string } }
) {
  const cardId = Number(params.card_id);
  if (isNaN(cardId)) {
    return NextResponse.json({ message: "Invalid card_id" }, { status: 400 });
  }

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
      { updateCard, message: `Updated card id ${cardId} success` },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Hàm DELETE
export async function DELETE(
  req: NextRequest,
  { params }: { params: { card_id: string } }
) {
  const cardId = Number(params.card_id);
  if (isNaN(cardId)) {
    return NextResponse.json({ message: "Invalid card_id" }, { status: 400 });
  }

  try {
    const deleteCart = await prisma.cart.delete({
      where: {
        cart_id: cardId,
      },
    });

    return NextResponse.json(
      { deleteCart, message: `Deleted card id ${cardId} success` },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
