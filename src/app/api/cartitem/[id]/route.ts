import prisma from "@/app/prisma/client";

import { NextRequest, NextResponse } from "next/server";
const JWT_SECRET: string = process.env.JWT_SECRET || "";
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const cartItemId = Number(id);
  try {
    const token = req.cookies.get("token")?.value;

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
