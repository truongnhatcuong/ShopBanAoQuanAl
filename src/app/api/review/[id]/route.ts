import { authenticateToken } from "@/lib/auth";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const token = req.cookies.get("token")?.value;
  const user = await authenticateToken(token);

  const hashAdmin = user?.some(
    (item) => item.permission.permission === "update"
  );
  if (!hashAdmin)
    return NextResponse.json(
      { message: "bạn không có quyền truy cập" },
      { status: 400 }
    );

  const { seller_response } = await req.json();
  if (!seller_response)
    return NextResponse.json(
      { message: "vui lòng nhập thông tin phản hồi" },
      { status: 401 }
    );
  try {
    const updatedReview = await prisma.review.update({
      where: {
        review_id: Number(id),
      },
      data: {
        seller_response: seller_response,
      },
    });

    return NextResponse.json({ updatedReview }, { status: 201 });
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
