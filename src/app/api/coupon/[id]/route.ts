import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const couponId = Number(params.id);
  try {
    const getCoupon = await prisma.coupon.findUnique({
      where: {
        coupon_id: couponId,
      },
    });
    return NextResponse.json(
      { getCoupon, message: "success" },
      { status: 200 }
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
  const couponId = Number(params.id);
  try {
    const updateCoupon = await prisma.coupon.update({
      where: {
        coupon_id: couponId,
      },
      data: {
        coupon_code: data.coupon_code,
        coupon_percentage: data.coupon_percentage,
        coupon_amount: data.coupon_amount,
        usage_limit: data.usage_limit,
        start_date: data.start_date,
        end_date: data.end_date,
        updated_at: new Date(),
      },
    });
    return NextResponse.json(
      { updateCoupon, message: "Updated success" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const couponId = Number(params.id);
  try {
    const getCoupon = await prisma.coupon.delete({
      where: {
        coupon_id: couponId,
      },
    });
    return NextResponse.json(
      { getCoupon, message: `Delete ${couponId} success` },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
