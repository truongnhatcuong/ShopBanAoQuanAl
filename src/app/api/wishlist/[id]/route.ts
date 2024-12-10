import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
  const wishId = Number(params.id);
  try {
    const getWish = await prisma.wishlist.findUnique({
      where: {
        wishlist_id: wishId,
      },
    });
    return NextResponse.json({ getWish, message: "success" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const wishId = Number(params.id);
  const data = await req.json();
  try {
    const updatedWish = await prisma.wishlist.update({
      where: {
        wishlist_id: wishId,
      },
      data: {
        customer_id: data.customer_id,
        product_id: data.product_id,
        added_at: new Date(),
      },
    });
    return NextResponse.json(
      { updatedWish, message: "success" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE({ params }: { params: { id: string } }) {
  const wishId = Number(params.id);
  const deleteWish = await prisma.wishlist.delete({
    where: {
      wishlist_id: wishId,
    },
  });
  return NextResponse.json(
    { deleteWish, message: "deleted success" },
    { status: 201 }
  );
}
