import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const countOrder = await prisma.orderItem.count();
    const customerCount = await prisma.customer.count();
    const totalOrderAmount = await prisma.order.aggregate({
      _sum: {
        total_amount: true, // Thay "total_amount" bằng tên chính xác của trường trong mô hình của bạn
      },
    });
    const totalAmount = totalOrderAmount._sum.total_amount || 0;
    const totalOrderQuantily = await prisma.orderItem.aggregate({
      _sum: {
        quantity: true,
      },
    });
    const totalQuantily = totalOrderQuantily._sum.quantity || 0;
    const startDate = new Date("2025-01-01");
    startDate.setHours(0, 0, 0, 0); // Đặt thời gian bắt đầu

    const endDate = new Date("2025-01-07");
    endDate.setHours(23, 59, 59, 999); // Đặt thời gian kết thúc

    const weeklyOrders = await prisma.order.count({
      where: {
        created_at: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return NextResponse.json(
      {
        totalQuantily,
        countOrder,
        totalAmount,
        customerCount,
        count: weeklyOrders,
        startDate: startDate.toLocaleString("vi-VN"),
        endDate: endDate.toLocaleString("vi-VN"),
        message: "succcess",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 501 });
  }
}
