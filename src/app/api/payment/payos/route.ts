import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { status, orderCode } = body;

    if (!orderCode) {
      return NextResponse.json(
        { message: "Missing orderCode" },
        { status: 400 }
      );
    }

    // Tìm Payment theo orderCode (paypal_order_id)
    const payment = await prisma.payment.findFirst({
      where: { paypal_order_id: String(orderCode) },
    });

    if (!payment) {
      console.log("Payment not found:", orderCode);
      return NextResponse.json({ message: "OK" });
    }

    // ===========================
    // PAYOS PAID → COMPLETED
    // ===========================
    if (status === "PAID") {
      await prisma.payment.update({
        where: { payment_id: payment.payment_id },
        data: { payment_status: "COMPLETED" },
      });

      await prisma.order.update({
        where: { order_id: payment.order_id },
        data: { order_state: "PROCESSING" },
      });

      console.log("Payment + Order COMPLETED:", orderCode);
      return NextResponse.json({ message: "OK" });
    }

    // ===========================
    // PAYOS CANCELLED / FAILED
    // Update trạng thái, KHÔNG xóa
    // ===========================
    if (status === "CANCELLED" || status === "FAILED") {
      const orderId = payment.order_id;

      // 1. Delete returns (ReturnProduct)
      await prisma.returnProduct.deleteMany({
        where: { order_id: orderId },
      });

      // 2. Delete order items
      await prisma.orderItem.deleteMany({
        where: { order_id: orderId },
      });

      // 3. Delete payment(s)
      await prisma.payment.deleteMany({
        where: { order_id: orderId },
      });

      // 4. Delete order last
      await prisma.order.delete({
        where: { order_id: orderId },
      });

      console.log("Order fully deleted:", orderCode);
      return NextResponse.json({ message: "DELETED" });
    }

    return NextResponse.json({ message: "Ignored" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
