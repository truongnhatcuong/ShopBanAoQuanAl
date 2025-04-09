import { authenticateToken } from "@/lib/auth";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const brandSchema = z.object({
  brandName: z
    .string()
    .min(5, "tên thương hiệu vui lòng nhập 5 ký tự")
    .max(255),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const brandId = Number(id);
  const { brandName, description } = await req.json();

  const parseResult = brandSchema.safeParse({ brandName, description });
  if (!parseResult.success) {
    return NextResponse.json(
      {
        message: parseResult.error.errors[0].message,
      },
      { status: 400 }
    );
  }
  try {
    const update = await prisma.brand.update({
      where: {
        brand_id: brandId,
      },
      select: { brand_name: true, description: true },
      data: {
        brand_name: brandName,
        description,
      },
    });
    return NextResponse.json(
      { update, message: "cập nhật thành công" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
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
    const hashAdmin = user?.some(
      (item) => item.permission.permission === "delete"
    );
    if (!hashAdmin)
      return NextResponse.json(
        { message: "bạn không có quyền truy cập" },
        { status: 400 }
      );
    await prisma.brand.delete({
      where: {
        brand_id: brandId,
      },
      select: { brand_id: true },
    });
    return NextResponse.json(
      { message: "xóa thành công thương hiệu này" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
