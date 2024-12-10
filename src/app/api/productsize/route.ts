import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const getProductSize = await prisma.productSize.findMany();
  return NextResponse.json(
    { getProductSize, message: "Get data Success" },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const createProductSize = await prisma.productSize.create({
      data: {
        product_id: data.product_id,
        size_id: data.size_id,
        stock_quantity: data.stock_quantity,
      },
    });
    return NextResponse.json(
      { createProductSize, message: " Success" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
