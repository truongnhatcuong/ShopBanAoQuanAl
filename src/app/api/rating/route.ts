import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const rating = await prisma.rating.findMany();
  return NextResponse.json({ rating, message: "success" }, { status: 201 });
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  const ratingValue = parseInt(data.rating);
  try {
    const createRating = await prisma.rating.create({
      data: {
        rating: ratingValue,
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
