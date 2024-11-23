import prisma from "@/app/prisma/client";

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const productId = id;
  try {
    const getProduct = await prisma.product.findUnique({
      where: {
        product_id: Number(productId),
      },
      include: {
        Category: true,
        Images: true,
        ProductSizes: true,
      },
    });
    return NextResponse.json(
      { getProduct, message: "Get product success" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const productId = Number(params.id);
  const data = await req.json();
  const price = parseFloat(data.price);

  if (isNaN(productId)) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }
  try {
    const updateProduct = await prisma.product.update({
      where: {
        product_id: productId,
      },
      data: {
        product_name: data.product_name,
        description: data.description,
        price: price,
        stock_quantity: data.stock_quantity,
        color: data.color,
        category_id: data.category_id || null,
        brand_id: data.brand_id || null,
        season_id: data.season_id || null,

        updated_at: new Date(),
      },
    });
    return NextResponse.json(
      { product: updateProduct, message: "Updated product success" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const productId = Number(params.id);
  try {
    const deleteProduct = await prisma.product.delete({
      where: {
        product_id: productId,
      },
    });
    return NextResponse.json(
      { Delete: deleteProduct, message: "deleted product success" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
