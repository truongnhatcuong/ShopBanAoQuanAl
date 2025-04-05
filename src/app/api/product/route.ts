import { authenticateToken } from "@/lib/auth";
import prisma from "@/prisma/client";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const searchParams = req.nextUrl.searchParams;
  // Lấy tham số tìm kiếm, phân trang và sắp xếp
  const search: string = searchParams?.get("search") || "";
  const limit: number = Number(searchParams?.get("limit") || 5);
  const page = Math.max(Number(searchParams?.get("page") || 1), 1);
  let sortOrder: any = searchParams?.get("sortOrder") || "asc";
  const sortField: string = searchParams.get("sortField") || "product_name";
  const maxPrice = Number(searchParams.get("maxPrice")) || 0;
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
      where: {
        product_name: {
          contains: search.toLowerCase(), // Lọc sản phẩm theo tên
        },
        ...(maxPrice > 0 && {
          price: {
            lte: maxPrice,
          },
        }),
      },

      orderBy: {
        [sortField]: sortOrder,
      },
      select: {
        product_id: true,
        product_name: true,

        price: true,
        Images: {
          take: 2,
          select: {
            image_url: true,
          },
        },
        ProductPromotion: {
          select: {
            Promotion: {
              select: {
                discount: true,
              },
            },
          },
        },
        Category: {
          select: {
            category_name: true,
          },
        },
      },
    });

    const user = await authenticateToken(token);
    let magamentProducts: any = [];
    if (user?.some((item) => item.permission.permission === "update")) {
      magamentProducts = await prisma.product.findMany({
        ...(limit > 0 && { skip: totalSkipRecords, take: limit }), // Phân trang
        where: {
          product_name: {
            contains: search.toLowerCase(), // Lọc sản phẩm theo tên
          },
          ...(maxPrice > 0 && {
            price: {
              lte: maxPrice,
            },
          }),
        },

        orderBy: {
          [sortField]: sortOrder,
        },
        select: {
          product_id: true,
          product_name: true,
          stock_quantity: true,
          price: true,
          ProductSizes: {
            select: {
              stock_quantity: true,
              Size: {
                select: {
                  name_size: true, // Nếu cần tên kích thước
                },
              },
            },
          },
          Images: {
            select: {
              image_url: true,
            },
          },
        },
      });
    }

    return NextResponse.json(
      {
        product,
        magamentProducts,
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
export const productSchema = z.object({
  product_name: z
    .string()
    .min(3, "Tên sản phẩm phải có ít nhất 3 ký tự")
    .max(100, "Tên sản phẩm không được vượt quá 100 ký tự")
    .trim(),

  description: z.string().min(10, "Mô tả sản phẩm phải có ít nhất 10 ký tự"),

  color: z
    .string()
    .min(3, "Màu sắc phải có ít nhất 3 ký tự")
    .max(30, "Màu sắc không được vượt quá 30 ký tự")
    .trim(),
});

export async function POST(req: NextRequest) {
  const data = await req.json();
  const isValid = productSchema.safeParse(data);
  if (!isValid.success) {
    return NextResponse.json(
      {
        message: isValid.error.errors[0].message,
      },
      { status: 400 }
    );
  }
  try {
    const {
      product_name,
      description,
      price,
      category_id,
      brand_id,
      season_id,
      sizes,
      color,
    } = data;

    const totalStockQuantity = sizes.reduce(
      (sum: number, size: any) => sum + size.stock_quantity,
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
