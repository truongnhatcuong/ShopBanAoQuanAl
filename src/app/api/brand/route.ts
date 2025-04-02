import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const search: string = searchParams.get("search") || "";
  const limit: number = Math.max(Number(searchParams.get("limit")) || 10) || 10;
  const page: number = Math.max(Number(searchParams.get("page")) || 1) || 1;

  const totalRecords = await prisma.brand.count({
    where: {
      brand_name: {
        contains: search,
      },
    },
  });
  // totalPages
  const totalPages = limit > 0 ? Math.ceil(totalRecords / limit) : 1;
  const totalSkipRecords = (page - 1) * limit;

  const brand = await prisma.brand.findMany({
    take: limit,
    skip: totalSkipRecords,
    where: {
      brand_name: {
        contains: search,
      },
    },
  });

  return NextResponse.json(
    {
      brand,
      pagination: {
        limit,
        currentPage: page,
        totalPages,
        totalSkipRecords,
      },
      message: "Success",
    },
    { status: 200 }
  );
}

const brandSchema = z.object({
  brandName: z
    .string()
    .min(5, "tên thương hiệu vui lòng nhập 5 ký tự")
    .max(255),
  description: z.string().min(5, "mô tả vui lòng nhập 5 ký tự").max(255),
});
export async function POST(req: NextRequest) {
  try {
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
    const newBrand = await prisma.brand.create({
      data: {
        brand_name: brandName,
        description,
      },
    });
    return NextResponse.json(
      { brand: newBrand, message: "Success" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
