import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const categoryId = Number(params.id);
    // TODO: Implement logic to fetch and return category details

    const category = await prisma.category.findUnique({
      where: {
        category_id: categoryId,
      },
    });
    if (category == null) {
      return NextResponse.json(
        { error: `not found ID: ${params.id}` },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ category: category }, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const categoryId = params.id;
    // TODO: Implement logic to delete category
    const deleteCategory = await prisma.category.delete({
      where: {
        category_id: Number(categoryId),
      },
    });
    if (deleteCategory === null) {
      return NextResponse.json(
        { error: `not found ID: ${params.id}` },
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
  try {
    const data = await req.json();
    const categoryId = Number(params.id);

    const categoriesSchema = z.object({
      category_name: z
        .string()
        .min(5, { message: "Độ Dài Tối Thiểu: 5" })
        .max(255, { message: "Độ Dài Tối Đa : 255 " }),
      description: z.string(),
      parent_id: z.number().optional(),
    });
    const isValid = categoriesSchema.safeParse({
      category_name: data.category_name,
      description: data.description,
      parent_id: data.parent_id,
    });

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
        category_name: isValid.data.category_name,
        description: isValid.data.description,
        parent_id: isValid.data.parent_id,
      },
    });
    if (updateCategory === null) {
      return NextResponse.json(
        { error: `not found ID: ${params.id}` },
        { status: 200 }
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
