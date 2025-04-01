import { products } from "./../../assets/frontend_assets/assets";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const keyword: string = searchParams?.get("keyword") || "";
  const limit: number = Number(searchParams?.get("limit") || 0);
  const page: number = Number(searchParams?.get("page") || 1);
  let sortOrder: any = searchParams?.get("sortOrder") || "asc";

  const totalRecords: number = await prisma.category.count({
    where: {
      category_name: {
        contains: keyword,
      },
    },
  });
  const totalPages = limit > 0 ? Math.ceil(totalRecords / limit) : 1;
  const totalSkipRecords = (page - 1) * limit;
  const categories = await prisma.category.findMany({
    ...(limit > 0 && { skip: totalSkipRecords, take: limit }),
    where: {
      category_name: {
        contains: keyword,
      },
    },
    orderBy: {
      category_name: sortOrder,
    },
    include: {
      _count: {
        select: {
          Products: true,
        },
      },
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
const categoriesSchema = z.object({
  categoriesName: z
    .string()
    .min(5, "Độ Dài Tối Thiểu: 5")
    .max(255, "Độ Dài Tối Đa : 255 "),
  description: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const { categoriesName, description } = await request.json();

    const isValid = categoriesSchema.safeParse({ categoriesName, description });

    if (!isValid.success) {
      return NextResponse.json(
        { message: isValid.error?.errors?.map((item) => item.message) || [] },
        { status: 400 }
      );
    }

    const newCategory = await prisma.category.create({
      data: {
        category_name: categoriesName,
        description: description,
      },
    });

    return NextResponse.json(
      { category: newCategory, message: "Added Category Success" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
