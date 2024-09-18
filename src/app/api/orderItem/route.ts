import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const getOrderItem = await prisma.orderItem.findMany();
  return NextResponse.json(
    { getOrderItem, message: "success" },
    { status: 201 }
  );
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const createOrderItem = await prisma.orderItem.create({
      data: {
        order_id: data.order_id,
        product_id: data.product_id,
        quantity: data.quantity,
        price: data.price,
        size_id: data.size_id,
        created_at: new Date(),
      },
    });
    return NextResponse.json(
      { createOrderItem, message: "created success" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
