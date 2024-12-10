import cloudinary from "@/app/config/cloudinaty";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params; // Lấy trực tiếp id từ params

  const image_id = Number(id); // Lấy image_id từ URL

  try {
    // Xử lý formData để lấy file
    const formData = await req.formData();
    const product_id = formData.get("product_id");
    const file = formData.get("files") as File; // Lấy file từ form data

    // Kiểm tra xem ảnh có tồn tại trong cơ sở dữ liệu không
    const image = await prisma.image.findUnique({
      where: { image_id },
    });

    if (!image) {
      return NextResponse.json(
        { message: "Không tìm thấy ảnh!" },
        { status: 404 }
      );
    }

    let newImageUrl = image.image_url; // Giữ nguyên URL cũ nếu không có file mới

    if (file) {
      // Nếu có file mới, tải ảnh lên Cloudinary
      const buffer = await file.arrayBuffer();
      const fileBase64 = Buffer.from(buffer).toString("base64");
      const uploadResult = await cloudinary.uploader.upload(
        `data:${file.type};base64,${fileBase64}`,
        { folder: "Upload" }
      );
      newImageUrl = uploadResult.secure_url; // Cập nhật URL ảnh mới
    }

    // Cập nhật thông tin hình ảnh trong cơ sở dữ liệu
    const updateImage = await prisma.image.update({
      where: { image_id },
      data: {
        product_id: Number(product_id), // Đảm bảo product_id là số
        image_url: newImageUrl,
        updated_at: new Date(),
      },
    });

    return NextResponse.json(
      { message: "Cập nhật thành công", updateImage },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function extractCloudinaryPublicId(url: string): string | null {
  try {
    // Loại bỏ query parameters (nếu có)
    const urlWithoutQuery = url.split("?")[0];

    // Dùng regex để trích xuất public_id từ URL Cloudinary
    const match = urlWithoutQuery.match(/\/v\d+\/([^/]+\/[^/]+)\.\w+$/); // Regex trích xuất public_id đúng

    if (match && match[1]) {
      return match[1]; // Trả về phần public_id
    } else {
      console.error("Không thể trích xuất Public ID từ URL:", url);
      return null;
    }
  } catch (error) {
    console.error("Lỗi khi trích xuất Public ID:", error);
    return null;
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const image_id = Number(id);
  try {
    const image = await prisma.image.findUnique({
      where: { image_id },
    });
    if (!image) {
      return NextResponse.json(
        { message: "hình ảnh không có sẵn !" },
        { status: 404 }
      );
    }
    const public_id = extractCloudinaryPublicId(image.image_url);
    if (!public_id) {
      return NextResponse.json(
        { message: "hình ảnh không có trên hệ thống" },
        { status: 404 }
      );
    }
    const cloudinaryResult = await cloudinary.uploader.destroy(public_id);
    if (cloudinaryResult.result !== "ok") {
      return NextResponse.json(
        { message: "Không thể xóa ảnh trên Cloudinary" },
        { status: 400 }
      );
    }
    await prisma.image.delete({ where: { image_id } });
    return NextResponse.json(
      { message: "xóa ảnh thành công" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
