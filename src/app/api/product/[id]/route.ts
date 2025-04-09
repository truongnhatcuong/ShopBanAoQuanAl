import { authenticateToken } from "@/lib/auth";
import prisma from "@/prisma/client";

import { NextRequest, NextResponse } from "next/server";
import { productSchema } from "../route";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const productId = id;
  try {
    const getProduct = await prisma.product.findUnique({
      where: {
        product_id: Number(productId),
      },
      select: {
        product_id: true,
        product_name: true,
        description: true,
        price: true,
        stock_quantity: true,
        Category: {
          select: {
            category_name: true,
          },
        },
        Images: {
          select: {
            image_url: true,
          },
        },
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
        ProductPromotion: {
          select: {
            Promotion: {
              select: {
                discount: true,
              },
            },
          },
        },
        Review: {
          select: {
            review_id: true,
            comment_review: true,
            image_url: true,
            review_date: true,
            seller_response: true,
            rating: true,
            Customer: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });

    const currenPrice = Number(getProduct?.price);
    let discount;
    if (
      getProduct?.ProductPromotion &&
      getProduct.ProductPromotion.length > 0
    ) {
      discount = getProduct.ProductPromotion[0].Promotion?.discount;
    }

    let originalPrice;
    if (discount !== undefined) {
      originalPrice = currenPrice / (1 - discount / 100);
    }

    const countReview = await prisma.review.count({
      where: {
        product_id: Number(productId),
      },
    });

    return NextResponse.json(
      {
        getProduct,
        originalPrice: originalPrice || null,
        countReview,
        message: "Get product success",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const productId = Number(id);

  const {
    product_name,
    description,
    price,
    color,
    category_id,
    brand_id,
    season_id,
    sizes,
  } = await req.json();

  const isValid = productSchema.safeParse({
    product_name,
    description,
    price,
    color,
    category_id,
    brand_id,
    season_id,
    sizes,
  });
  if (!isValid.success) {
    return NextResponse.json(
      {
        message: isValid.error.errors[0].message,
      },
      { status: 400 }
    );
  }
  if (!category_id || !brand_id || !season_id || !sizes) {
    return NextResponse.json(
      { message: "vui lòng nhập giá trị" },
      { status: 404 }
    );
  }
  if (isNaN(productId)) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  try {
    const totalStockQuantity = sizes?.reduce(
      (total: number, item: any) => total + item.stock_quantity,
      0
    );

    const updateProduct = await prisma.product.update({
      where: { product_id: productId },
      data: {
        product_name,
        description,
        price,
        color,
        stock_quantity: totalStockQuantity,
        category_id,
        season_id,
        brand_id,
        ProductSizes: {
          deleteMany: {},
          create: sizes?.map(
            (size: { size_id: number; stock_quantity: number }) => ({
              size_id: size.size_id,
              stock_quantity: size.stock_quantity,
            })
          ),
        },
      },
      select: { product_name: true },
    });

    return NextResponse.json(
      {
        updateProduct,
        message: "Cập nhật sản phẩm thành công",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 501 });
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // lấy token phía cookies
  const token = req.cookies.get("token")?.value;
  // xác thực
  const user = await authenticateToken(token);
  const hashAdmin = user?.some(
    (item) => item.permission.permission === "delete"
  );
  if (!hashAdmin)
    return NextResponse.json(
      { message: "bạn không có quyền truy cập" },
      { status: 400 }
    );
  const productId = Number(params.id);
  try {
    //xóa sản phẩm
    const deleteProduct = await prisma.product.delete({
      where: {
        product_id: productId,
      },
      select: { product_name: true },
    });
    return NextResponse.json(
      { Delete: deleteProduct, message: "deleted product success" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
