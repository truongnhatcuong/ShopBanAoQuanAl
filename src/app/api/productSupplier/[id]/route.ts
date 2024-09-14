import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supplier_id = Number(params.id);
  try {
    const getProduct = await prisma.productSupplier.findMany({
      where: {
        supplier_id: supplier_id,
      },
    });
    return NextResponse.json(
      { product: getProduct, message: "Get product success" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string; productId: string } }
) {
  const data = await req.json();
  const SupplierId = Number(params.id);
  const productId = Number(params.productId);
  try {
    const updateProductSupplier = await prisma.productSupplier.update({
      where: {
        product_id_supplier_id: {
          supplier_id: SupplierId,
          product_id: productId,
        },
      },
      data: {
        supply_date: data.supply_date,
        quantity: data.quantity,
      },
    });
    return NextResponse.json(
      { product: updateProductSupplier, message: "updated success" },
      { status: 200 }
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
    const getProduct = await prisma.productSupplier.deleteMany({
      where: {
        product_id: productId,
      },
    });
    return NextResponse.json(
      { product: getProduct, message: "Get product success" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
