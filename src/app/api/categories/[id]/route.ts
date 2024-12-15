import { authenticateToken } from "@/lib/auth";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    const categoryId = Number(id);
    // TODO: Implement logic to fetch and return category details

    const category = await prisma.category.findUnique({
      where: {
        category_id: categoryId,
      },
      include: {
        Products: {
          include: {
            Images: true,
          },
        },
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: `Category with ID ${id} not found` },
        { status: 404 }
      );
    }

    if (category == null) {
      return NextResponse.json(
        { error: `not found ID: ${id}` },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { category, message: "thành công" },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
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
        { message: "Bạn Không Có quyền truy Cập thông Tin Này " },
        { status: 404 }
      );
    }
    const categoryId = Number(id);
    // TODO: Implement logic to delete category
    const deleteCategory = await prisma.category.delete({
      where: {
        category_id: Number(categoryId),
      },
    });
    if (deleteCategory === null) {
      return NextResponse.json(
        { error: `not found ID: ${id}` },
        { status: 200 }
      );
    }
    return NextResponse.json({ message: "Deleted Success" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    const data = await req.json();
    const categoryId = Number(id);

    const categoriesSchema = z.object({
      category_name: z
        .string()
        .min(5, { message: "Độ Dài Tối Thiểu: 5" })
        .max(255, { message: "Độ Dài Tối Đa : 255 " }),
      description: z.string(),
      parent_id: z.number().optional(),
    });
    const isValid = categoriesSchema.safeParse(data);

    if (!isValid.success) {
      return NextResponse.json(
        { errors: isValid.error.errors },
        { status: 400 }
      );
    }
    const updateCategory = await prisma.category.update({
      where: {
        category_id: categoryId,
      },
      data: {
        category_name: data.category_name,
        description: data.description,
        parent_id: data.parent_id,
      },
    });
    if (updateCategory === null) {
      return NextResponse.json(
        { error: `not found ID: ${params.id}` },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { updateCategory, message: "Updated Success" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
