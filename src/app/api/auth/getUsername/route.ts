import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/app/prisma/client";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // Lấy token từ cookie

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Decode token
    const decoded: any = jwt.verify(token, JWT_SECRET);

    // Truy vấn người dùng dựa vào `userId` trong token
    const user = await prisma.customer.findUnique({
      where: { username: decoded.username },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Trả về username
    return NextResponse.json({ accessToken: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }
}
