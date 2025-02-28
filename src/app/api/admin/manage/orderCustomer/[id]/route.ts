import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const orderId = Number(id);
  const { payment_status, order_state } = await req.json();
  try {
    const update = await prisma.order.update({
      where: {
        order_id: orderId,
      },
      data: {
        order_state: order_state,
        Payments: {
          updateMany: {
            where: { order_id: orderId },
            data: {
              payment_status: payment_status,
            },
          },
        },
      },
      include: {
        Payments: true,
      },
    });
    return NextResponse.json(
      { update, message: "cập nhật thành công" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 501 });
  }
}
