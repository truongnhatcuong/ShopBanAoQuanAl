import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const getOrder = await prisma.order.findMany();
  return NextResponse.json({ getOrder, message: "success" }, { status: 201 });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const createOrder = await prisma.order.create({
      data: {
        customer_id: data.customer_id,
        order_date: data.order_date,
        total_amount: data.total_amount,
        order_state: data.order_state,
      },
    });
    return NextResponse.json(
      { createOrder, message: "deleted success" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
