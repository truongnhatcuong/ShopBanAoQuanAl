import { authenticateToken } from "@/lib/auth";
import prisma from "@/prisma/client";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

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

export async function PUT(
  req: NextResponse,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const seasonId = Number(params.id);
  try {
    const updateSeasonId = await prisma.season.update({
      where: {
        season_id: seasonId,
      },
      data: {
        season_name: data.season_name,
        description: data.description,
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
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const hasDeletePermission = user.role.permissions.some(
    (perm) => perm.permission.permission === "delete"
  );

  if (!hasDeletePermission) {
    return NextResponse.json(
      { message: "Bạn Không Có quyền truy Cập thông Tin Này" },
      { status: 403 }
    );
  }
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
