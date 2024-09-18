import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
  const returnId = Number(params.id);
  try {
    const getcartitem = await prisma.return.findUnique({
      where: {
        return_id: returnId,
      },
    });
    return NextResponse.json(
      { getcartitem, message: `found Id ${returnId} success` },
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
  const returnId = Number(params.id);
  const data = await req.json();
  try {
    const updateReturn = await prisma.return.update({
      where: {
        return_id: returnId,
      },
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
      { updateReturn, message: `updated Id ${returnId} success` },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE({ params }: { params: { id: string } }) {
  const returnId = Number(params.id);
  try {
    const getcartitem = await prisma.return.delete({
      where: {
        return_id: returnId,
      },
    });
    return NextResponse.json(
      { getcartitem, message: `deleted Id ${returnId} success` },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
