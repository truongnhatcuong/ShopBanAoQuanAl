import prisma from "@/app/prisma/client";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const Product = await prisma.product.findMany({
    include: {
      Images: true,
    },
  });
  console.log(Product);
  return NextResponse.json(
    { Product, message: "Get data Success" },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("Received data:", data);
    const price = parseFloat(data.price);
    const newProduct = await prisma.product.create({
      data: {
        product_name: data.product_name,
        description: data.description || null,
        price: price,
        stock_quantity: data.stock_quantity || 0,
        color: data.color,
        category_id: data.category_id,
        brand_id: data.brand_id,
        season_id: data.season_id || null,
        created_at: new Date(),
      },
    });
    return NextResponse.json(
      {
        product_id: newProduct.product_id,
        message: "Create new product success",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
