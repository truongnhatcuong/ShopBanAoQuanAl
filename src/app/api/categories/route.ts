import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
export async function GET(request: NextRequest) {
  const categories = await prisma.category.findMany();

  //lấy tất cả dữ liệu của user
  return NextResponse.json({ categories, message: "Success" }, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const categoriesSchema = z.object({
      name: z
        .string()
        .min(5, { message: "Độ Dài Tối Thiểu: 5" })
        .max(255, { message: "Độ Dài Tối Đa : 255 " }),
      description: z.string(),
    });
    const isValid = categoriesSchema.safeParse(data);
    if (!isValid.success) {
      return NextResponse.json(
        { errors: isValid.error.errors },
        { status: 400 }
      );
    }
    const newCategory = await prisma.category.create({
      data: {
        category_name: data.name,
        description: data.description,
      },
    });

    return NextResponse.json(
      { category: newCategory, message: "Added Category Success" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
