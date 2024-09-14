import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const paymentId = Number(params.id);
  try {
    const getpaymentId = await prisma.payment.findUnique({
      where: {
        payment_id: paymentId,
      },
    });
    return NextResponse.json(
      { getpaymentId, message: "found success" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const paymentId = Number(params.id);
  const data = await req.json();
  try {
    const updatePayment = await prisma.payment.update({
      where: {
        payment_id: paymentId,
      },
      data: {
        order_id: data.order_id,
        payment_method: data.payment_method,
        payment_status: data.payment_status,
        payment_amount: data.payment_amount,
      },
    });
    return NextResponse.json(
      { updatePayment, message: "found success" },
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
  const paymentId = Number(params.id);
  const deletePayment = await prisma.payment.delete({
    where: {
      payment_id: paymentId,
    },
  });
  return NextResponse.json(
    { deletePayment, message: "deleted success" },
    { status: 200 }
  );
}
