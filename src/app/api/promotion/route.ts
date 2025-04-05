import { authenticateToken } from "@/lib/auth";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const promotion = await prisma.promotion.findMany({
    include: {
      ProductPromotions: {
        include: {
          Product: {
            select: {
              product_id: true,
              product_name: true,
              price: true,
              Images: {
                select: {
                  image_url: true,
                },
              },
            },
          },
        },
      },
    },
  });
  const formattedPromotions = promotion.map((promotion) => ({
    promotion_id: promotion.promotion_id,
    discount: promotion.discount,
    start_date: promotion.start_date,
    end_date: promotion.end_date,
    products: promotion.ProductPromotions.map((productPromotion) => {
      const currentPrice = Number(productPromotion.Product.price);
      const originalPrice = currentPrice / (1 - promotion.discount / 100);
      return {
        product_id: productPromotion.Product.product_id,
        product_name: productPromotion.Product.product_name,
        current_price: currentPrice.toFixed(0),
        original_price: originalPrice.toFixed(0),
        images: productPromotion.Product.Images.map((image) => ({
          image_url: image.image_url,
        })).slice(0, 2),
      };
    }),
  }));

  return NextResponse.json(
    { promotions: formattedPromotions },
    { status: 200 }
  );
}
export async function POST(req: NextRequest) {
  // lấy token
  const token = req.cookies.get("token")?.value;
  const user = await authenticateToken(token);
  const hashAdmin = user?.some(
    (item) => item.permission.permission === "update"
  );
  if (!hashAdmin)
    return NextResponse.json(
      { message: "bạn không có quyền truy cập" },
      { status: 400 }
    );
  const { discount, start_date, end_date, product_id } = await req.json();

  try {
    // kiểm tra đầu vào
    if (
      discount < 0 ||
      discount > 100 ||
      !start_date ||
      !end_date ||
      !product_id
    ) {
      return NextResponse.json(
        { message: "vui lòng nhập thông tin hợp lệ" },
        { status: 404 }
      );
    }

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    if (
      isNaN(startDate.getTime()) ||
      isNaN(endDate.getTime()) ||
      startDate >= endDate
    ) {
      return NextResponse.json(
        { message: "Ngày bắt đầu phải trước ngày kết thúc" },
        { status: 400 }
      );
    }
    // lấy thông tin sản phẩm hiện tại
    const product = await prisma.product.findUnique({
      where: {
        product_id: product_id,
      },
    });
    if (!product) {
      return NextResponse.json(
        { message: "không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }
    //giá gốc
    const originalPrice = Number(product.price);
    // giá giảm giá
    const discountProduct = originalPrice * (1 - discount / 100);

    // khởi tạo giảm giá
    const promotion = await prisma.promotion.create({
      data: {
        discount,
        start_date: startDate,
        end_date: endDate,
        ProductPromotions: {
          create: {
            product_id: product_id,
          },
        },
      },
    });
    // thanh đổi giá product khi nhập dữ liệu
    await prisma.product.update({
      where: {
        product_id: product_id,
      },
      data: {
        price: Math.round(discountProduct * 100) / 100,
      },
    });
    // kiểm tra khuyến mãi đã kết thúc hay chưa
    const currentDate = new Date();
    if (currentDate > endDate) {
      await prisma.product.update({
        where: {
          product_id: product_id,
        },
        data: {
          price: originalPrice,
        },
      });

      // xóa productId khi hết hạn
      await prisma.productPromotion.deleteMany({
        where: {
          product_id: product_id,
        },
      });
    }

    return NextResponse.json(
      { promotion, message: "thành công" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
