import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16" as any, // Giữ phiên bản ổn định
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();
  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }
  //payment_intent
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const orderId = paymentIntent.metadata.order_id;
    await prisma.payment.update({
      where: {
        stripe_payment_intent: paymentIntent.id,
      },
      data: { payment_status: "COMPLETED", updated_at: new Date() },
    });
    await prisma.order.update({
      where: {
        order_id: Number(orderId),
      },
      data: {
        order_state: "PROCESSING",
        updated_at: new Date(),
      },
    });
  } else if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const orderId = paymentIntent.metadata.order_id;
    // Update payment status
    await prisma.payment.update({
      where: { stripe_payment_intent: paymentIntent.id },
      data: {
        payment_status: "FAILED",
        updated_at: new Date(),
      },
    });
    // Update order status
    await prisma.order.update({
      where: { order_id: Number(orderId) },
      data: {
        order_state: "CANCELLED",
        updated_at: new Date(),
      },
    });
  }
  return NextResponse.json({ received: true }, { status: 200 });
}
