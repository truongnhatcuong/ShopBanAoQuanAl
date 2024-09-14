import prisma from "@/app/prisma/client";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const Product = await prisma.product.findMany();
  return NextResponse.json(
    { Product, message: "Get data Success" },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const newProduct = await prisma.product.create({
      data: {
        product_name: data.product_name,
        description: data.description,
        price: data.price,
        stock_quantity: data.stock_quantity,
        category_id: data.category_id,
        brand_id: data.brand_id,
        season_id: data.season_id,
        rating_id: data.rating_id,
        color: data.color,
        created_at: new Date(),
      },
    });
    return NextResponse.json(
      { product: newProduct, message: "Create new product success" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
