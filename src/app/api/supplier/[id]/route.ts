import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supplierId = Number(params.id);
  try {
    const getSupplier = await prisma.supplier.findUnique({
      where: {
        supplier_id: supplierId,
      },
    });
    return NextResponse.json(
      { getSupplier, message: `Get Data ${supplierId} success` },
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
  const supplierId = Number(params.id);
  const data = await req.json();
  try {
    const updateSupplier = await prisma.supplier.update({
      where: {
        supplier_id: supplierId,
      },
      data: {
        supplier_name: data.supplier_name,
        contact_info: data.contact_info,
      },
    });
    return NextResponse.json(
      { updateSupplier, message: "updated success" },
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
  const supplierId = Number(params.id);
  try {
    const getSupplier = await prisma.supplier.delete({
      where: {
        supplier_id: supplierId,
      },
    });
    return NextResponse.json(
      { getSupplier, message: `deleted ${supplierId} success` },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
