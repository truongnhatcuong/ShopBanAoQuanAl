import cloudinary from "@/app/config/cloudinaty";
import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("file") as File[];
    const productId = formData.get("product_id");

    if (!files.length || !productId) {
      return NextResponse.json(
        { message: "Thiếu file hoặc product_id" },
        { status: 400 }
      );
    }

    // Upload ảnh lên Cloudinary
    const uploadPromises = files.map(async (file) => {
      const buffer = await file.arrayBuffer();
      const fileBase64 = Buffer.from(buffer).toString("base64");

      const uploadResult = await cloudinary.uploader.upload(
        `data:${file.type};base64,${fileBase64}`,
        { folder: "Upload" }
      );
      console.log("Upload result: ", uploadResult);

      return {
        image_url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      };
    });

    const uploadedImages = await Promise.all(uploadPromises);

    // Lưu thông tin ảnh vào database Prisma
    const prismaPromises = uploadedImages.map(async (image) => {
      return prisma.image.create({
        data: {
          product_id: Number(productId),
          image_url: image.image_url,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
    });

    await Promise.all(prismaPromises);

    return NextResponse.json(
      { message: "Upload và lưu dữ liệu thành công", images: uploadedImages },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
