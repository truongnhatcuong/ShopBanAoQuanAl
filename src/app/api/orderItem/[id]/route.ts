import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
  const orderItemId = Number(params.id);

  try {
    const getOrderItem = await prisma.orderItem.findUnique({
      where: {
        orderitem_id: orderItemId,
      },
    });
    return NextResponse.json(
      { getOrderItem, message: `found Id ${orderItemId} success` },
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
  const orderItemId = Number(params.id);
  const data = await req.json();
  try {
    const updateOrderItem = await prisma.orderItem.update({
      where: {
        orderitem_id: orderItemId,
      },
      data: {
        order_id: data.order_id,
        product_id: data.product_id,
        quantity: data.quantity,
        price: data.price,
        size_id: data.size_id,
        updated_at: new Date(),
      },
    });
    return NextResponse.json(
      { updateOrderItem, message: `updated  success` },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE({ params }: { params: { id: string } }) {
  const orderItemId = Number(params.id);

  try {
    const getOrderItem = await prisma.orderItem.delete({
      where: {
        orderitem_id: orderItemId,
      },
    });
    return NextResponse.json(
      { getOrderItem, message: `deleted Id ${orderItemId} success` },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
