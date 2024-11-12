import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/prisma/client";
import jwt from "jsonwebtoken";

// Định nghĩa kiểu dữ liệu cho Payload của JWT
interface JwtPayload {
  userId: number;
  username: string;
}

const authenticateToken = (req: NextRequest): JwtPayload | null => {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return null; // Nếu không có token, trả về null
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || ""
    ) as JwtPayload;
    return decoded; // Trả về thông tin người dùng (nếu cần)
  } catch (err) {
    return null; // Nếu token không hợp lệ
  }
};

export async function GET(req: NextRequest) {
  const decoded = authenticateToken(req);

  if (!decoded) {
    return NextResponse.json(
      { message: "Token không hợp lệ hoặc hết hạn." },
      { status: 401 }
    );
  }

  // Tìm người dùng trong cơ sở dữ liệu với thông tin xác thực từ decoded (có thể là ID người dùng)
  const user = await prisma.customer.findFirst({
    where: {
      username: decoded.username, // Dùng userId từ decoded để tìm người dùng
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Không tìm thấy người dùng." },
      { status: 404 }
    );
  }

  return NextResponse.json({ user }, { status: 200 });
}
