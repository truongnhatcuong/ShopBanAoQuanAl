import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
  if (!JWT_SECRET) {
    return NextResponse.json(
      { message: "JWT_SECRET is not defined" },
      { status: 500 }
    );
  }
  const { username, password } = await req.json();
  try {
    const user = await prisma.customer.findUnique({
      where: { username },
      include: { role: { include: { permissions: true } } },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Tên người dùng không tồn tại" },
        { status: 400 }
      );
    }

    if (!user.password) {
      return NextResponse.json(
        { message: "Mật khẩu không chính xác" },
        { status: 400 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Mật khẩu không chính xác" },
        { status: 400 }
      );
    }

    const accessToken = jwt.sign({ username: user.username }, JWT_SECRET, {
      expiresIn: "1h",
    });

    await prisma.customer.update({
      where: { username },
      data: { token: accessToken },
    });

    const response = NextResponse.json(
      {
        username: username,
        token: accessToken,
        message: "Đăng nhập thành công",
      },
      { status: 200 }
    );

    response.cookies.set("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      path: "/",
      sameSite: "strict",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 501 });
  }
}
