import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const getAllCart = await prisma.cart.findMany();
  return NextResponse.json({ getAllCart, message: "success" }, { status: 201 });
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const createCart = await prisma.cart.create({
      data: {
        customer_id: data.customer_id,
        created_at: new Date(),
      },
    });
    return NextResponse.json(
      { createCart, message: "create success" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
