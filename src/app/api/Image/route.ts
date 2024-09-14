import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const Image = await prisma.image.findMany();
  return NextResponse.json({ Image, message: "success" }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const newImage = await prisma.image.create({
      data: {
        product_id: data.product_id,
        image_url: data.image_url,
        created_at: new Date(),
      },
    });
    return NextResponse.json(
      { newImage, message: "Create success" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
