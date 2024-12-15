import { authenticateToken } from "@/lib/auth";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const brandId = Number(id);
  const { brand_name, description } = await req.json();
  if (!brand_name || !description) {
    return NextResponse.json(
      { message: "vui lòng điền thông tin" },
      { status: 404 }
    );
  }
  try {
    const update = await prisma.brand.update({
      where: {
        brand_id: brandId,
      },
      data: {
        brand_name,
        description,
      },
    });
    return NextResponse.json(
      { update, message: "cập nhật thành công" },
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
  const { id } = await params;
  const brandId = Number(id);
  try {
    // lấy token phía cookies
    const token = req.cookies.get("token")?.value;
    // xác thực
    const user = await authenticateToken(token);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // nếu có permisson === delete thì có thể xóa
    const hasDeletePermission = user.role.permissions.some(
      (perm) => perm.permission.permission === "delete"
    );

    if (!hasDeletePermission) {
      return NextResponse.json(
        { message: "Bạn Không Có quyền truy Cập thông Tin Này" },
        { status: 403 }
      );
    }
    await prisma.brand.delete({
      where: {
        brand_id: brandId,
      },
    });
    return NextResponse.json({ message: "xóa thành công" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
