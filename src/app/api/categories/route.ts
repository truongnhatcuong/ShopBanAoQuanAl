import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const keyword: string = searchParams?.get("keyword") || "";
  const limit: number = Number(searchParams?.get("limit") || 4);
  const page: number = Number(searchParams?.get("page") || 1);
  let sortOrder: any = searchParams?.get("sortOrder") || "asc";

  if (sortOrder !== "asc" && sortOrder !== "desc") {
    sortOrder == "asc";
  }
  const totalRecords: number = await prisma.category.count({
    where: {
      category_name: {
        contains: keyword,
      },
    },
  });
  const totalPages = Math.ceil(totalRecords / limit);
  const totalSkipRecords = (page - 1) * limit;
  const categories = await prisma.category.findMany({
    skip: totalSkipRecords,
    take: limit,
    where: {
      category_name: {
        contains: keyword,
      },
    },
    orderBy: {
      category_name: sortOrder,
    },
  });

  //lấy tất cả dữ liệu của user
  return NextResponse.json(
    {
      categories,
      pagination: {
        totalRecords,
        totalPages,
        currentPage: page,
        limit,
      },
      message: "Success",
    },
    { status: 200 }
  );
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
