import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const size = await prisma.size.findMany();
  return NextResponse.json({ size, message: "success" }, { status: 201 });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const createdSize = await prisma.size.create({
      data: {
        name_size: data.name_size,
      },
    });
    return NextResponse.json(
      { createdSize, message: "success" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
