import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const notificationId = Number(params.id);
  if (!notificationId) {
    return NextResponse.json({ message: " not found id " }, { status: 200 });
  }
  try {
    const getNotification = await prisma.notification.findUnique({
      where: {
        notification_id: notificationId,
      },
    });
    return NextResponse.json(
      { getNotification, message: `Get ${notificationId} success` },
      { status: 500 }
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
  const notificationId = Number(params.id);
  try {
    const updateNotification = await prisma.notification.update({
      where: {
        notification_id: notificationId,
      },
      data: {
        customer_id: data.customer_id,
        notification_type: data.notification_type,
        message: data.message,
        is_read: data.is_read,
      },
    });
    return NextResponse.json(
      { updateNotification, message: "Updated Success" },
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
  const notificationId = Number(params.id);
  try {
    const DeleteNotification = await prisma.notification.delete({
      where: {
        notification_id: notificationId,
      },
    });
    return NextResponse.json(
      { DeleteNotification, message: `delete Id : ${notificationId} Success` },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
