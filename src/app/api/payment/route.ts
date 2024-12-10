import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const GetPaymen = await prisma.payment.findMany();
  return NextResponse.json(
    { GetPaymen, message: "found success" },
    { status: 201 }
  );
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const createPayment = await prisma.payment.create({
      data: {
        order_id: data.order_id,
        payment_method: data.payment_method,
        payment_status: data.payment_status,
        payment_amount: data.payment_amount,
      },
    });
    return NextResponse.json(
      { createPayment, message: "created success" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
