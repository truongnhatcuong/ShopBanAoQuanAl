import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const productId = Number(params.id);
  try {
    const getImage = await prisma.image.findMany({
      where: {
        product_id: productId,
      },
    });
    return NextResponse.json(
      { getImage, message: "Get success" },
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
  const productId = Number(params.id);
  const data = await req.json();
  try {
    const updateImage = await prisma.image.updateMany({
      where: {
        product_id: productId,
      },
      data: {
        image_url: data.image_url,
        updated_at: new Date(),
      },
    });
    return NextResponse.json(
      { updateImage, message: "Updated success" },
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
  const productId = Number(params.id);
  try {
    const DeleteImage = await prisma.image.deleteMany({
      where: {
        product_id: productId,
      },
    });
    return NextResponse.json(
      { DeleteImage, message: "deleted success" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
