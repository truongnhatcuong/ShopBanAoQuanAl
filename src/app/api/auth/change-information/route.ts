import cloudinary from "@/app/config/cloudinaty";
import prisma from "@/prisma/client";
import jwt from "jsonwebtoken";

import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const files = formData.getAll("files") as File[];

  if (!JWT_SECRET) {
    return NextResponse.json(
      { message: "JWT_SECRET chưa được định nghĩa" },
      { status: 404 }
    );
  }
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "token không tồn tại" },
      { status: 404 }
    );
  }

  const token = authHeader.split(" ")[1];
  // xác thực

  try {
    const uploadPromises = files.map(async (item) => {
      const buffer = await item.arrayBuffer();
      const fileBase64 = Buffer.from(buffer).toString("base64");
      const uploadResult = await cloudinary.uploader.upload(
        `data:${item.type};base64,${fileBase64}`,
        { folder: "Upload" }
      );
      return {
        image_url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      };
    });
    const UploadImage = await Promise.all(uploadPromises);
    const firstImageUrl =
      UploadImage.length > 0 ? UploadImage[0].image_url : null;
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const username = decoded.username;
    if (!username) {
      return NextResponse.json(
        { message: "người dùng không hợp lệ trong Token" },
        { status: 404 }
      );
    }
    const user = await prisma.customer.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json(
        { message: "người dùng không tồn tại" },
        { status: 404 }
      );
    }

    await prisma.customer.update({
      where: { username },
      data: {
        name: name,
        phone: phone,
        image: firstImageUrl,
      },
    });

    return NextResponse.json(
      { message: "cập nhật thành công" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
