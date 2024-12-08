import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const cartAdmin = await prisma.cart.findMany({
    include: {
      Customer: {
        select: {
          name: true,
        },
      },
      CartItems: {
        select: {
          quantity: true,
          Product: {
            select: { price: true, product_name: true },
          },
          Size: {
            select: {
              size_id: true,
              name_size: true,
            },
          },
        },
      },
    },
  });
  return NextResponse.json({ cartAdmin, message: "success" }, { status: 201 });
}
