import { products } from "./../../../assets/frontend_assets/assets";
import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const promotionId = Number(id);

  try {
    // kiểm tra  id khuyến mãi có tồn tại không
    const promotion = await prisma.promotion.findUnique({
      where: {
        promotion_id: promotionId,
      },
      include: {
        ProductPromotions: true,
      },
    });
    if (!promotion) {
      return NextResponse.json(
        { message: "không tìm thấy khuyến mãi" },
        { status: 404 }
      );
    }
    // Lấy product_id từ khuyến mãi
    const productId = promotion.ProductPromotions[0]?.product_id;
    // lấy thông tin sản phẩm để cập nhật lại giá
    if (productId) {
      const product = await prisma.product.findUnique({
        where: {
          product_id: productId,
        },
      });
      // cập nhật giá cũ
      if (product) {
        const discountPrice = Number(product.price);
        const discount = promotion.discount / 100;
        const originalPrice = discountPrice / (1 - discount);
        // lưu vào dữ liệu
        await prisma.product.update({
          where: {
            product_id: productId,
          },
          data: { price: Math.round(originalPrice * 100) / 100 },
        });
      }
    }
    // Xóa các bản ghi liên quan trong ProductPromotions
    await prisma.productPromotion.deleteMany({
      where: {
        promotion_id: promotionId,
      },
    });

    // xóa khuyến mãi
    await prisma.promotion.delete({
      where: {
        promotion_id: promotionId,
      },
    });
    return NextResponse.json(
      { message: "xóa khuyến mãi thành công" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
