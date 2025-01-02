import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const orderId = Number(id);
  try {
    await prisma.orderItem.deleteMany({
      where: {
        order_id: orderId,
      },
    });
    await prisma.payment.deleteMany({
      where: {
        order_id: orderId,
      },
    });
    // Sau đó xóa Order
    const deletedOrder = await prisma.order.delete({
      where: {
        order_id: orderId,
      },
    });

    return NextResponse.json(
      { deletedOrder, message: `deleted success` },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
