import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const ratingId = Number(params.id);
  try {
    const RatingID = await prisma.rating.findUnique({
      where: {
        rating_id: ratingId,
      },
    });
    return NextResponse.json(
      { RatingID, message: " success" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
