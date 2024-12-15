import { authenticateToken } from "@/lib/auth";
import prisma from "@/prisma/client";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  // Lấy tham số tìm kiếm, phân trang và sắp xếp
  const search: string = searchParams?.get("search") || "";
  const limit: number = Number(searchParams?.get("limit") || 0);
  const page: number = Number(searchParams?.get("page") || 1);
  let sortOrder: any = searchParams?.get("sortOrder") || "asc";
  if (sortOrder !== "asc" && sortOrder !== "desc") {
    sortOrder = "asc";
  }

  const totalRecords: number = await prisma.product.count({
    where: {
      product_name: {
        contains: search,
      },
    },
  });
  const totalPages = limit > 0 ? Math.ceil(totalRecords / limit) : 1;
  const totalSkipRecords = (page - 1) * limit;

  try {
    // Lấy danh sách sản phẩm kèm thông tin liên quan
    const product = await prisma.product.findMany({
      ...(limit > 0 && { skip: totalSkipRecords, take: limit }), // Phân trang
      where: {
        product_name: {
          contains: search, // Lọc sản phẩm theo tên
        },
      },
      orderBy: {
        product_name: sortOrder, // Sắp xếp theo tên sản phẩm
      },
      include: {
        ProductSizes: {
          select: {
            stock_quantity: true,
            Size: {
              select: {
                size_id: true,
                name_size: true, // Nếu cần tên kích thước
              },
            },
          },
        },
        Images: {
          select: {
            image_id: true,
            image_url: true,
          },
        },

        Category: {
          select: {
            category_name: true, // Tên danh mục
          },
        },
        Brand: {
          select: {
            brand_name: true, // Tên thương hiệu
          },
        },
        Season: {
          select: {
            season_name: true, // Tên mùa
          },
        },
      },
    });

    return NextResponse.json(
      {
        product,
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
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const {
      product_name,
      description,
      price,
      stock_quantity,
      category_id,
      brand_id,
      season_id,
      sizes, // [{ size_id: number, stock_quantity: number }]
      color,
    } = data;
    if (
      !product_name ||
      !price ||
      !category_id ||
      !brand_id ||
      !sizes ||
      sizes.length === 0
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    const totalStockQuantity = sizes.reduce(
      (sum: any, size: any) => sum + size.stock_quantity,
      0
    );
    const newProduct = await prisma.product.create({
      data: {
        product_name,
        description,
        price: Number(price),
        stock_quantity: totalStockQuantity,
        category_id,
        brand_id,
        season_id,
        color,
        ProductSizes: {
          create: sizes?.map(
            (size: { size_id: number; stock_quantity: number }) => ({
              size_id: size.size_id,
              stock_quantity: size.stock_quantity,
            })
          ),
        },
      },
    });
    return NextResponse.json(
      {
        product_id: newProduct.product_id,
        message: "thêm sản phẩm thành công",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
