import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const search: string = searchParams.get("search") || "";
  const limit: number = Math.max(Number(searchParams.get("limit")) || 1) || 1;
  const page: number = Math.max(Number(searchParams.get("page")) || 1) || 1;
  let sortOrder: any = searchParams.get("sortOrder") || "asc";
  if (sortOrder !== "asc" && sortOrder !== "desc") return (sortOrder = "asc");
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

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const newBrand = await prisma.brand.create({
      data: {
        brand_name: data.brand_name,
        description: data.description,
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
