import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const notification = await prisma.notification.findMany();
  return NextResponse.json(
    { notification, message: "Get data Success" },
    { status: 200 }
  );
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const newNotification = await prisma.notification.create({
      data: {
        customer_id: data.customer_id,
        notification_type: data.notification_type,
        message: data.message,
        is_read: data.is_read,
        created_at: new Date(),
      },
    });
    return NextResponse.json(
      { newNotification, message: "created Success" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
