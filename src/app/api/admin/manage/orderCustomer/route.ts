import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const orderCustomer = await prisma.order.findMany({
    include: {
      Customer: {
        select: {
          name: true,
          email: true,
        },
      },
      Payments: {
        select: {
          payment_id: true,
          payment_status: true,
          payment_method: true,
        },
      },
    },
    orderBy: {
      order_id: "desc",
    },
  });

  return NextResponse.json(
    { orderCustomer, message: "success" },
    { status: 201 }
  );
}
