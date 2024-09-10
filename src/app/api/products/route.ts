import prisma from "@/app/prisma/client";
import { Prisma } from "@prisma/client";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  const Product = await prisma.product.findMany();
  return NextResponse.json(
    { Product, message: "Get data Success" },
    { status: 200 }
  );
}

export async function POST(req: NextApiRequest) {
  try {
    const data = await req.body;
    const newProduct = await prisma.product.create({
      data: {
        product_name: data.name,
        description: data.description,
        price: data.price,
        Images: data.images,
        stock_quantity: data.stock_quantity,
        category_id: data.category_id,
        brand_id: data.brand_id,
        season_id: data.season_id,
        rating_id: data.rating_id,
        color: data.color,
        created_at: new Date(),
        updated_at: new Date(),
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
