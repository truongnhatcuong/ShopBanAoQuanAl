// app/api/promotion-notification/route.ts
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const promotionNotifications =
      await prisma.promotionNotification.findMany();
    return NextResponse.json(
      {
        promotionNotifications,
        message: "PromotionNotifications retrieved successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    const newPromotionNotification = await prisma.promotionNotification.create({
      data: {
        notification_id: data.notification_id,
        coupon_id: data.coupon_id,
      },
    });

    return NextResponse.json(
      {
        newPromotionNotification,
        message: "PromotionNotification created successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
