import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const wishlist = await prisma.wishlist.findMany();
  return NextResponse.json({ wishlist, message: "success" }, { status: 201 });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const createWishlist = await prisma.wishlist.create({
      data: {
        customer_id: data.customer_id,
        product_id: data.product_id,
        added_at: new Date(),
      },
    });
    return NextResponse.json(
      { createWishlist, message: "created success" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
