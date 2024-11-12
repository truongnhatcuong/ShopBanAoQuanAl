// /app/api/change-password/route.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
  // Kiểm tra biến JWT_SECRET
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

  const token = authHeader.split(" ")[1]; // Lấy token từ Authorization header

  try {
    // Xác minh token và lấy username từ token
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const username = decoded.username;

    // Kiểm tra username hợp lệ
    if (!username) {
      return NextResponse.json(
        { message: "Username không hợp lệ trong token" },
        { status: 400 }
      );
    }

    const { currentPassword, newPassword } = await req.json();

    // Kiểm tra mật khẩu mới và mật khẩu cũ có giống nhau không
    if (currentPassword === newPassword) {
      return NextResponse.json(
        { message: "Mật khẩu mới không được giống với mật khẩu cũ" },
        { status: 400 }
      );
    }

    // Tìm người dùng theo username
    const user = await prisma.customer.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Người dùng không tồn tại" },
        { status: 400 }
      );
    }

    // Kiểm tra mật khẩu hiện tại
    if (!user.password) {
      return NextResponse.json(
        { message: "Mật khẩu không tồn tại trong cơ sở dữ liệu" },
        { status: 400 }
      );
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Mật khẩu hiện tại không chính xác" },
        { status: 400 }
      );
    }

    // Mã hóa mật khẩu mới
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu mới trong cơ sở dữ liệu
    await prisma.customer.update({
      where: { username },
      data: { password: hashedNewPassword },
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
