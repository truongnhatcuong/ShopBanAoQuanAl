import prisma from "@/prisma/client";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  try {
    if (!token) {
      return NextResponse.json(
        { message: "Missing order token" },
        { status: 400 }
      );
    }

    const payment = await prisma.payment.findFirst({
      where: { paypal_order_id: token },
      select: { order_id: true },
    });
    // Nếu không tìm thấy payment, trả về lỗi
    if (!payment) {
      return NextResponse.json(
        { message: "Payment not found for this PayPal order" },
        { status: 404 }
      );
    }

    await prisma.$transaction(async (tx) => {
      await tx.orderItem.deleteMany({
        where: { order_id: payment.order_id },
      });
      await tx.payment.deleteMany({
        where: { paypal_order_id: token },
      });
      await tx.order.delete({
        where: { order_id: payment.order_id },
      });
    });

    return NextResponse.redirect(
      new URL(`${process.env.NEXT_PUBLIC_API_URL}/order/cancel`, req.url),
      302
    );
  } catch (error) {
    console.log(error);
  }
}
