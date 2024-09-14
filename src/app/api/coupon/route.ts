import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const coupon = await prisma.coupon.findMany();
  return NextResponse.json({ coupon, message: "success" }, { status: 201 });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const newCoupon = await prisma.coupon.create({
      data: {
        coupon_code: data.coupon_code,
        coupon_percentage: data.coupon_percentage,
        coupon_amount: data.coupon_amount,
        usage_limit: data.usage_limit,
        start_date: data.start_date,
        end_date: data.end_date,
        created_at: new Date(),
      },
    });
    return NextResponse.json(
      { newCoupon, message: "created success " },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
