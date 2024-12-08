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
  const { id } = await params;
  const supplierId = Number(id);
  const { supplier_name, contact_info, product_id, quantity, supply_date } =
    await req.json();
  try {
    const updateSupplier = await prisma.supplier.update({
      where: {
        supplier_id: supplierId,
      },
      data: {
        supplier_name,
        contact_info,
        ProductSuppliers: {
          update: {
            where: {
              product_id_supplier_id: {
                supplier_id: supplierId,
                product_id,
              },
            },
            data: {
              quantity: Number(quantity),
              supply_date: new Date(supply_date),
            },
          },
        },
      },
      include: {
        ProductSuppliers: true,
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
