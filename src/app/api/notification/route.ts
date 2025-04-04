import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { authCustomer } from "@/utils/Auth";

export async function GET(req: NextRequest) {
  try {
    const customer = await authCustomer(req);
    if (!customer)
      return NextResponse.json(
        { message: "vui lòng đăng nhập" },
        { status: 400 }
      );
    const notification = await prisma.notification.findMany({
      where: {
        customer_id: customer?.customer_id,
      },
      select: {
        notification_id: true,
        notification_type: true,
        message: true,
        is_read: true,
        created_at: true,
      },
      orderBy: {
        notification_id: "desc",
      },
    });
    const countNotification = await prisma.notification.count({
      where: {
        customer_id: customer?.customer_id,
        is_read: false,
      },
    });
    return NextResponse.json(
      { notification, countNotification, message: "Get data Success" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error?.message }, { status: 501 });
  }
}
