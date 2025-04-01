import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const season = await prisma.season.findMany({});
  return NextResponse.json({ season, message: "success" }, { status: 200 });
}

const seasonSchema = z.object({
  season_name: z
    .string()
    .min(3, "Tên mùa phải có ít nhất 3 ký tự")
    .max(100, "Tên mùa không được vượt quá 100 ký tự"),
  description: z
    .string()
    .min(10, "Mô tả mùa phải có ít nhất 10 ký tự")
    .max(500, "Mô tả mùa không được vượt quá 500 ký tự"),
});

export async function POST(req: NextRequest) {
  const { season_name, description } = await req.json();

  const isValid = seasonSchema.safeParse({ season_name, description });
  if (!isValid.success) {
    return NextResponse.json(
      { message: isValid.error?.errors?.map((item) => item.message) || [] },
      { status: 400 }
    );
  }
  try {
    const newSeason = await prisma.season.create({
      data: {
        season_name,
        description,
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
