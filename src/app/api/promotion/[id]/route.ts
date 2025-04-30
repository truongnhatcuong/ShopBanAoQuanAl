import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  // Validate ID
  if (!id || id.trim() === "") {
    return NextResponse.json(
      { message: "ID khuyến mãi không được để trống" },
      { status: 400 }
    );
  }

  const promotionId = Number(id);
  console.log("Parsed promotionId:", promotionId);

  if (isNaN(promotionId)) {
    return NextResponse.json(
      { message: "ID khuyến mãi không hợp lệ" },
      { status: 400 }
    );
  }

  try {
    // Log all promotions for debugging
    const allPromotions = await prisma.promotion.findMany({
      select: { promotion_id: true },
    });
    console.log("All promotion IDs in database:", allPromotions);

    // Check if promotion exists
    const promotion = await prisma.promotion.findUnique({
      where: { promotion_id: promotionId },
      include: { ProductPromotions: true },
    });

    console.log("Promotion found:", promotion);

    if (!promotion) {
      return NextResponse.json(
        { message: "Không tìm thấy khuyến mãi" },
        { status: 404 }
      );
    }

    // Get product ID from promotion
    const productId =
      promotion.ProductPromotions.length > 0
        ? promotion.ProductPromotions[0].product_id
        : null;
    console.log("Product ID:", productId);

    // Start a transaction for database operations
    await prisma.$transaction(async (tx) => {
      // Update product price if productId exists
      if (productId) {
        const product = await tx.product.findUnique({
          where: { product_id: productId },
        });

        if (product) {
          const discountPrice = Number(product.price);
          const discount = promotion.discount / 100;

          // Validate discount
          if (discount >= 1 || discount <= 0) {
            throw new Error("Giá trị giảm giá không hợp lệ");
          }

          const originalPrice = discountPrice / (1 - discount);
          console.log("Calculated originalPrice:", originalPrice);

          await tx.product.update({
            where: { product_id: productId },
            data: { price: Number(originalPrice.toFixed(2)) },
          });
        }
      }

      // Delete related ProductPromotions
      await tx.productPromotion.deleteMany({
        where: { promotion_id: promotionId },
      });

      // Delete the promotion
      await tx.promotion.delete({
        where: { promotion_id: promotionId },
      });
    });

    return NextResponse.json(
      { message: "Xóa khuyến mãi thành công" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting promotion:", error);
    return NextResponse.json(
      { error: "Lỗi khi xóa khuyến mãi" },
      { status: 500 }
    );
  }
}
