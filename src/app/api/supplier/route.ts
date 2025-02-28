import prisma from "@/prisma/client";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const search: string = searchParams.get("search") || "";
  const limit: number = Number(searchParams.get("limit")) || 0;
  const page: number = Math.max(Number(searchParams.get("page") || 1) || 1);
  const sortOrder: any = searchParams.get("sortOrder") || "asc";
  // kiem tra dieu kien
  if (sortOrder !== "asc" && sortOrder !== "desc") return sortOrder == "asc";
  // tìm kiếm
  const totalRecords = await prisma.supplier.count({
    where: {
      supplier_name: {
        contains: search,
      },
    },
  });
  // tổng số trang
  const totalPages = limit > 0 ? Math.ceil(totalRecords / limit) : 1;
  const totalSkipRecords = (page - 1) * limit;
  const supplier = await prisma.supplier.findMany({
    ...(limit > 0 && { skip: totalSkipRecords, take: limit }),
    where: {
      supplier_name: {
        contains: search.toLowerCase(),
      },
    },
    include: {
      ProductSuppliers: {
        select: {
          quantity: true,
          supply_date: true,
          Product: {
            select: {
              product_id: true,
              product_name: true,
            },
          },
        },
      },
    },
    orderBy: { supplier_name: sortOrder },
  });

  return NextResponse.json(
    {
      supplier,
      pagination: { totalRecords, totalPages, currentPage: page, limit },
      message: "Get supplier success ",
    },
    { status: 201 }
  );
}

export async function POST(req: NextRequest) {
  const { supplier_name, contact_info, product_id, quantity, supply_date } =
    await req.json();
  try {
    const parsedQuantity = Number(quantity);
    // Validate dữ liệu input
    if (!supplier_name || !product_id || !quantity) {
      return NextResponse.json(
        { message: "Thiếu thông tin bắt buộc" },
        { status: 400 }
      );
    }
    //kiểm tra sản phẩm có tồn tại không
    const existingProduct = await prisma.product.findUnique({
      where: {
        product_id,
      },
    });
    if (!existingProduct) {
      return NextResponse.json(
        { message: "sản phẩm không tồn tại" },
        { status: 404 }
      );
    }

    const newSupplier = await prisma.supplier.create({
      data: {
        supplier_name,
        contact_info,
        ProductSuppliers: {
          create: {
            product_id,
            quantity: parsedQuantity,
            supply_date: new Date(supply_date),
          },
        },
      },
    });
    return NextResponse.json(
      { newSupplier, message: "created success" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
