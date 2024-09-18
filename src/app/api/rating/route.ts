import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const rating = await prisma.rating.findMany();
  return NextResponse.json({ rating, message: "success" }, { status: 201 });
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const createRating = await prisma.rating.create({
      data: {
        rating: data,
      },
    });
    return NextResponse.json(
      { createRating, message: "Created success" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
