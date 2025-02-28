import { authenticateToken } from "@/lib/auth";
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
  const { id } = await params;
  const token = req.cookies.get("token")?.value;
  const admin = await authenticateToken(token);

  const hashAdmin = admin?.role.permissions.some(
    (item) => item.permission.permission === "update"
  );
  if (!hashAdmin) {
    console.log("Access denied: Redirecting to login page");
    return NextResponse.json({ message: "error" }, { status: 401 });
  }

  const { seller_response } = await req.json();
  try {
    const updatedReview = await prisma.review.update({
      where: {
        review_id: Number(id),
      },
      data: {
        seller_response: seller_response,
      },
    });

    return NextResponse.json(updatedReview);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update review response" },
      { status: 500 }
    );
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
