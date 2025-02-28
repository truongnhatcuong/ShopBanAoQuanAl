import cloudinary from "@/app/config/cloudinaty";
import prisma from "@/prisma/client";
import { authCustomer } from "@/utils/Auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const getAllReview = await prisma.review.findMany({
    include: {
      Customer: {
        select: {
          name: true,
        },
      },
      Product: {
        select: {
          product_name: true,
        },
      },
    },
  });

  return NextResponse.json(
    { getAllReview, message: "success" },
    { status: 201 }
  );
}
export async function POST(req: NextRequest) {
  const customer = await authCustomer(req);
  const formData = await req.formData();
  const product_id = formData.get("product_id");
  const comment_review = formData.get("comment_review");
  const rating = formData.get("rating");
  const files = formData.getAll("files") as File[];

  if (!customer) {
    return NextResponse.json(
      { message: "Không tìm thấy người dùng." },
      { status: 400 }
    );
  }

  if (!customer) {
    return NextResponse.json(
      {
        message: "không tìm thấy người dùng.",
      },
      { status: 400 }
    );
  }

  try {
    const existingReview = await prisma.review.findFirst({
      where: {
        customer_id: customer.customer_id,
        product_id: Number(product_id),
      },
    });

    if (existingReview) {
      return NextResponse.json(
        {
          message:
            "Bạn đã đánh giá sản phẩm này rồi. Không thể gửi đánh giá mới.",
        },
        { status: 400 }
      );
    }

    const order = await prisma.order.findFirst({
      where: {
        customer_id: customer?.customer_id,
        order_state: "DELIVERED",
      },
      include: {
        OrderItems: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        {
          message:
            "Bạn chỉ có thể đánh giá sản phẩm khi đơn hàng đã được giao.",
        },
        { status: 400 }
      );
    }

    const uploadPromises = files.map(async (file) => {
      const buffer = await file.arrayBuffer();
      const fileBase64 = Buffer.from(buffer).toString("base64");

      const uploadResult = await cloudinary.uploader.upload(
        `data:${file.type};base64,${fileBase64}`,
        { folder: "Upload" }
      );

      return uploadResult.secure_url;
    });

    const uploadedImages = await Promise.all(uploadPromises);

    // Tạo đánh giá
    const review = await prisma.review.create({
      data: {
        product_id: Number(product_id),
        customer_id: customer.customer_id,
        comment_review: comment_review as string,
        image_url: uploadedImages.join(", "), // Kết hợp các ảnh thành một chuỗi
        review_date: new Date(),
        hasReviewed: true,
        rating: Number(rating),
      },
    });

    return NextResponse.json(
      { review, message: "Đánh giá thành công." },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error while processing review:", error); // Ghi lại lỗi chi tiết
    return NextResponse.json(
      { message: error.message || "Đã xảy ra lỗi." },
      { status: 500 }
    );
  }
}
