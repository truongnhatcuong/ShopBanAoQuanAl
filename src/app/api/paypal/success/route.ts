import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import paypal from "@paypal/checkout-server-sdk";
import prisma from "@/prisma/client";

function getPaypalClient() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_SECRET;
  if (!clientId || !secret) {
    throw new Error("Missing PayPal credentials");
  }
  const environment = new paypal.core.SandboxEnvironment(clientId, secret);
  return new paypal.core.PayPalHttpClient(environment);
}

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

    console.log("Attempting to capture PayPal order with token:", token);

    const client = getPaypalClient();
    const request = new paypal.orders.OrdersCaptureRequest(token);
    const response = await client.execute(request);

    console.log("PayPal capture response:", response.result);

    // Kiểm tra bản ghi trước khi update
    const payment = await prisma.payment.findFirst({
      where: { paypal_order_id: response.result.id },
    });

    if (!payment) {
      console.log(
        "No payment record found for paypal_order_id:",
        response.result.id
      );
      return NextResponse.json(
        { message: "Payment record not found" },
        { status: 404 }
      );
    }

    // Cập nhật trạng thái thanh toán
    const updatedPayment = await prisma.payment.update({
      where: { paypal_order_id: response.result.id },
      data: {
        payment_status: "COMPLETED",
        updated_at: new Date(),
      },
    });

    return NextResponse.redirect(
      new URL(`${process.env.NEXT_PUBLIC_API_URL}/order/success`, req.url),
      302
    );
  } catch (error: any) {
    console.error("Detailed Capture Error:", {
      message: error.message,
      stack: error.stack,
      statusCode: error.statusCode,
      response: error.response?.result,
    });

    // Xử lý lỗi từ PayPal
    if (error.statusCode && error.response?.result) {
      const errorDetails = error.response.result.details?.[0];
      const errorMessage =
        error.response.result.message || "Unknown PayPal error";

      if (
        error.statusCode === 422 &&
        errorDetails?.issue === "INSTRUMENT_DECLINED"
      ) {
        try {
          const updatedPayment = await prisma.payment.update({
            where: { paypal_order_id: token! },
            data: {
              payment_status: "FAILED",
              updated_at: new Date(),
            },
          });

          if (!updatedPayment) {
            console.log("No payment record found for paypal_order_id:", token);
            return NextResponse.json(
              { message: "Payment record not found" },
              { status: 404 }
            );
          }

          return NextResponse.json(
            {
              message: "Payment declined",
              error:
                "The payment method was declined. Please try another method.",
            },
            { status: 402 }
          );
        } catch (prismaError) {
          console.error("Prisma Update Error in Catch:", prismaError);
          return NextResponse.json(
            {
              message: "Error updating payment status",
              error: "Database error",
            },
            { status: 500 }
          );
        }
      }

      return NextResponse.json(
        { message: "Error capturing payment", error: errorMessage },
        { status: error.statusCode || 500 }
      );
    }

    // Xử lý lỗi khác (Prisma hoặc hệ thống)
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Unexpected error occurred", error: errorMessage },
      { status: 500 }
    );
  }
}
