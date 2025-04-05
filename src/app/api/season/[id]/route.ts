import { authenticateToken } from "@/lib/auth";
import prisma from "@/prisma/client";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(
  req: NextApiRequest,
  { params }: { params: { id: string } }
) {
  const seasonId = Number(params.id);
  try {
    const getSeanson = await prisma.season.findUnique({
      where: {
        season_id: seasonId,
      },
    });
    return NextResponse.json(
      { getSeanson, message: "Get success" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
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

export async function PUT(
  req: NextResponse,
  { params }: { params: { id: string } }
) {
  const { season_name, description } = await req.json();
  const seasonId = Number(params.id);
  const isValid = seasonSchema.safeParse({ season_name, description });
  if (!isValid.success) {
    return NextResponse.json(
      { message: isValid.error?.errors?.map((item) => item.message) || [] },
      { status: 400 }
    );
  }
  try {
    const updateSeasonId = await prisma.season.update({
      where: {
        season_id: seasonId,
      },
      data: {
        season_name,
        description,
      },
    });
    return NextResponse.json(
      { updateSeasonId, message: "Updated success" },
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
  const token = req.cookies.get("token")?.value;
  const user = await authenticateToken(token);
  const hashAdmin = user?.some(
    (item) => item.permission.permission === "delete"
  );
  if (!hashAdmin)
    return NextResponse.json(
      { message: "bạn không có quyền truy cập" },
      { status: 400 }
    );
  const seasonId = Number(params.id);
  try {
    const deleteSeason = await prisma.season.delete({
      where: {
        season_id: seasonId,
      },
    });
    return NextResponse.json(
      { deleteSeason, message: "Deleted success" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
