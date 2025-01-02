import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const countOrder = await prisma.orderItem.count();
    const customerCount = await prisma.customer.count();

    const today = new Date("2025-01-02");
    today.setHours(0, 0, 0, 0);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    const todayOrders = await prisma.order.count({
      where: {
        created_at: {
          gte: today,
          lte: endOfDay,
        },
      },
    });
    return NextResponse.json(
      {
        countOrder,
        customerCount,
        count: todayOrders,
        date: today.toLocaleString("vi-VN"),
        endOfDay: endOfDay.toLocaleString("vi-VN"),
        message: "succcess",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 501 });
  }
}
