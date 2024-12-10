import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import prisma from "@/prisma/client"; // Path to your Prisma client

const uploadsDir = path.join(process.cwd(), "public/Image");

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const productId = formData.get("product_id");

  // Kiểm tra xem ID sản phẩm có được cung cấp không
  if (!productId) {
    return NextResponse.json({ error: "Cần có ID sản phẩm." }, { status: 400 });
  }

  const imageFiles = formData.getAll("images[]"); // Lấy tất cả hình ảnh

  // Kiểm tra xem có hình ảnh nào được tải lên không
  if (imageFiles.length === 0) {
    return NextResponse.json(
      { error: "not found image update." },
      { status: 400 }
    );
  }

  try {
    for (const file of imageFiles) {
      const buffer = Buffer.from(await (file as Blob).arrayBuffer());
      const filename = (file as File).name.replaceAll(" ", "_");
      const filePath = path.join(uploadsDir, filename);

      await writeFile(filePath, new Uint8Array(buffer));

      // Lưu từng hình ảnh vào cơ sở dữ liệu
      await prisma.image.create({
        data: {
          product_id: Number(productId), // Đảm bảo product_id là số
          image_url: `/Image/${filename}`,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
    }

    return NextResponse.json(
      { message: "Create Image Success" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi khi tải lên tệp." },
      { status: 500 }
    );
  }
};
