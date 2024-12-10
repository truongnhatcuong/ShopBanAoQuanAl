import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const riviewId = Number(params.id);
  try {
    const getIdReview = await prisma.review.findUnique({
      where: {
        review_id: riviewId,
      },
    });
    return NextResponse.json(
      { getIdReview, message: " success" },
      { status: 201 }
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
  const reviewId = Number(params.id);
  try {
    const createdReview = await prisma.review.update({
      where: {
        review_id: reviewId,
      },
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
      { createdReview, message: " success" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const riviewId = Number(params.id);
  try {
    const deleteReview = await prisma.review.delete({
      where: {
        review_id: riviewId,
      },
    });
    return NextResponse.json(
      { deleteReview, message: " deleted success" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
