import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const season = await prisma.season.findMany({});
  return NextResponse.json({ season, message: "success" }, { status: 200 });
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const newSeason = await prisma.season.create({
      data: {
        season_name: data.season_name,
        description: data.description,
      },
    });
    return NextResponse.json(
      { newSeason, message: "created success" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
