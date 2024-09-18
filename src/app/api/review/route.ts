import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const getAllReview = await prisma.review.findMany();
  return NextResponse.json(
    { getAllReview, message: "success" },
    { status: 201 }
  );
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const createRiview = await prisma.review.create({
      data: {
        product_id: data.product_id,
        customer_id: data.customer_id,
        comment_review: data.comment_review,
        image_url: data.image_url,
        seller_response: data.seller_response,
        rating: data.rating,
      },
    });
    return NextResponse.json(
      { createRiview, message: " created success" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
