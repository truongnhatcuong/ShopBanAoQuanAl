import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const productId = Number(params.id);
  try {
    const images = await prisma.image.findMany({
      where: {
        product_id: productId,
      },
    });
    return NextResponse.json(
      { images, message: "Get success" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const uploadsDir = path.join(process.cwd(), "public/Image");
  const formData = await req.formData();
  const imageId = formData.get("image_id");
  const productId = formData.get("product_id");
  const newFile = formData.get("file");

  // Kiểm tra xem ID hình ảnh có được cung cấp không
  if (!imageId) {
    return NextResponse.json(
      { error: "ID không được tìm thấy." },
      { status: 400 }
    );
  }

  try {
    const existingImage = await prisma.image.findUnique({
      where: {
        image_id: Number(imageId),
      },
    });

    if (!existingImage) {
      return NextResponse.json(
        { error: "Hình ảnh không tồn tại." },
        { status: 404 }
      );
    }

    let newImageUrl = existingImage.image_url;

    if (newFile) {
      const buffer = Buffer.from(await (newFile as Blob).arrayBuffer());
      const filename = (newFile as File).name.replaceAll(" ", "_");
      const uniqueFilename = `${Date.now()}_${filename}`;
      const filePath = path.join(uploadsDir, uniqueFilename);

      await writeFile(filePath, new Uint8Array(buffer));
      newImageUrl = `/Image/${uniqueFilename}`;
    }

    const updatedImage = await prisma.image.update({
      where: {
        image_id: Number(imageId),
      },
      data: {
        product_id: Number(productId),
        image_url: newImageUrl,
      },
    });

    return NextResponse.json(
      { updatedImage, message: "Cập nhật thành công" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const imageId = Number(params.id);
  try {
    const DeleteImage = await prisma.image.delete({
      where: {
        image_id: imageId,
      },
    });
    return NextResponse.json(
      { DeleteImage, message: "deleted success" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
