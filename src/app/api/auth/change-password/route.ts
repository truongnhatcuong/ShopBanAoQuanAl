import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
  if (!JWT_SECRET) {
    return NextResponse.json(
      { message: "JWT_SECRET chưa được định nghĩa" },
      { status: 500 }
    );
  }

  const authHeader = req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Token không hợp lệ hoặc không tồn tại" },
      { status: 401 }
    );
  }
  const token = authHeader.split(" ")[1];

  try {
    const decode: any = jwt.verify(token, JWT_SECRET);
    const username = decode.username;

    if (!username) {
      return NextResponse.json({
        message: "Người dùng không hợp lệ trong token",
      });
    }

    const { currentPassword, newPassword } = await req.json();

    if (currentPassword === newPassword) {
      return NextResponse.json(
        {
          message: "trùng với mật khẩu cũ vui lòng nhập mật khẩu mới",
        },
        { status: 404 }
      );
    }

    const user = await prisma.customer.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({
        message: "Người dùng không Tồn tại",
      });
    }
    // Kiểm tra mật khẩu hiện tại
    if (!user.password) {
      return NextResponse.json(
        {
          message: "Mật khẩu không tồn tại trong cơ sở dữ liệu",
        },
        { status: 404 }
      );
    }

    // kiểm tra mật khẩu hiện tại có trùng với mật khẩu trong CSDL Không

    const changePassword = await bcrypt.compare(currentPassword, user.password);

    if (!changePassword) {
      return NextResponse.json(
        { message: "Vui lòng nhập đúng mật khẩu" },
        { status: 404 }
      );
    }

    // Mã Hóa Lại Mật Khẩu Mới
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    await prisma.customer.update({
      where: { username },
      data: {
        password: newPasswordHash,
      },
    });

    return NextResponse.json(
      { message: "Mật khẩu đã được thay đổi thành công" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Token không hợp lệ hoặc đã hết hạn", error: error.message },
      { status: 401 }
    );
  }
}
