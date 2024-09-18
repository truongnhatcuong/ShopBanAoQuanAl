import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const getReturn = await prisma.return.findMany();
  return NextResponse.json({ getReturn, message: "success" }, { status: 201 });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const createReturn = await prisma.return.create({
      data: {
        order_id: data.order_id,
        product_id: data.product_id,
        return_reason: data.return_reason,
        return_date: data.return_date,
        return_status: data.return_status,
        return_amount: data.return_amount,
      },
    });
    return NextResponse.json(
      { createReturn, message: "deleted success" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
