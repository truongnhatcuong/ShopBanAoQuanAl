import prisma from "@/prisma/client";
import { authCustomer } from "@/utils/Auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const notificationId = await Number(id);
  try {
    const customer = await authCustomer(req);
    if (!customer) {
      return NextResponse.json(
        { message: "Người dùng không xác thực." },
        { status: 404 }
      );
    }

    const updateNotification = await prisma.notification.updateMany({
      where: {
        customer_id: customer.customer_id,
        notification_id: notificationId,
        is_read: false,
      },
      data: {
        is_read: true,
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
