import prisma from "@/prisma/client";
import jwt from "jsonwebtoken";

import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;
export async function POST(req: NextRequest) {
  const { name, phone, address } = await req.json();
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
        address: address,
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
