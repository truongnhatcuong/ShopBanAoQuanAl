// app/api/promotion-notification/route.ts
import prisma from "@/app/prisma/client";
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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await req.json();

  try {
    const updatedPromotionNotification =
      await prisma.promotionNotification.update({
        where: {
          promotion_notification_id: parseInt(params.id),
        },
        data: {
          coupon_id: data.coupon_id,
        },
      });

    return NextResponse.json(
      {
        updatedPromotionNotification,
        message: "PromotionNotification updated successfully",
      },
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
  const promotionNotificationsId = params.id;
  try {
    const deletePromotionNotifications =
      await prisma.promotionNotification.delete({
        where: {
          promotion_notification_id: Number(promotionNotificationsId),
        },
      });
    return NextResponse.json(
      {
        deletePromotionNotifications,
        message: `deleted Success ${promotionNotificationsId}`,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
