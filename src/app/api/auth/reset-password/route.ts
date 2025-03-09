import bcrypt from "bcryptjs";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    // Hash token từ params để so sánh với token trong database
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Tìm người dùng với token tương ứng
    const customer = await prisma.customer.findFirst({
      where: {
        token: hashedToken,
        // Đảm bảo token chưa hết hạn (1 giờ)
        updated_at: {
          gt: new Date(Date.now() - 60 * 60 * 1000),
        },
      },
    });

    if (!customer) {
      return NextResponse.json(
        { message: "Token không hợp lệ hoặc đã hết hạn" },
        { status: 400 }
      );
    }

    // Hash mật khẩu mới
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Cập nhật mật khẩu và xóa token
    await prisma.customer.update({
      where: { customer_id: customer.customer_id },
      data: {
        password: hashedPassword,
        token: null,
      },
    });

    return NextResponse.json({
      message: "Mật khẩu đã được đặt lại thành công",
    });
  } catch (error) {
    console.error("Error during password reset:", error);
    return NextResponse.json(
      { message: "Đã xảy ra lỗi, vui lòng thử lại sau" },
      { status: 500 }
    );
  }
}
