import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const Product = await prisma.productSupplier.findMany();
  return NextResponse.json(
    { Product, message: "Get ALL data Success" },
    { status: 201 }
  );
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const newProductSupplier = await prisma.productSupplier.create({
      data: {
        supplier_id: data.supplier_id,
        product_id: data.product_id,
        supply_date: data.supply_date,
        quantity: data.quantity,
      },
    });
    return NextResponse.json(
      { newProductSupplier, message: "created data Success" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
