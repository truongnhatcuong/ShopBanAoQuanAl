import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
  const orderId = Number(params.id);
  try {
    const getOrderId = await prisma.order.findUnique({
      where: {
        order_id: orderId,
      },
    });
    return NextResponse.json(
      { getOrderId, message: `found Id ${orderId} success` },
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
  const orderId = Number(params.id);
  const data = await req.json();
  try {
    const updateCartitem = await prisma.order.update({
      where: {
        order_id: orderId,
      },
      data: {
        customer_id: data.customer_id,
        order_date: data.order_date,
        total_amount: data.total_amount,
        order_state: data.order_state,
      },
    });
    return NextResponse.json(
      { updateCartitem, message: `created success` },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE({ params }: { params: { id: string } }) {
  const orderId = Number(params.id);
  try {
    const getOrderId = await prisma.order.delete({
      where: {
        order_id: orderId,
      },
    });
    return NextResponse.json(
      { getOrderId, message: `deleted success` },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
