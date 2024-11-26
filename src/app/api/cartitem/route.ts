import { Customer } from "@prisma/client";
import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cartItem = await prisma.cartItem.findMany();
  return NextResponse.json({ cartItem, message: "success" }, { status: 201 });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const createCartItem = await prisma.cartItem.create({
      data: {
        cart_id: data.cart_id,
        product_id: data.product_id,
        quantity: data.quantity,
      },
      include: {
        Cart: true,
      },
    });
    return NextResponse.json(
      { createCartItem, message: "created success" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
