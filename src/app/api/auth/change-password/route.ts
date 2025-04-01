import bcrypt from "bcryptjs";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { authCustomer } from "@/utils/Auth";

const changePasswordSchema = z.object({
  currentPassword: z.string().min(8, "vui lòng nhập hơn 8 kí tự").max(225),
  newPassword: z.string().min(8, "vui lòng nhập hơn 8 kí tự").max(225),
});

export async function POST(req: NextRequest) {
  try {
    const customer = await authCustomer(req);
    const { currentPassword, newPassword } = await req.json();

    const parseResult = changePasswordSchema.safeParse({
      currentPassword,
      newPassword,
    });

    if (!parseResult.success) {
      return NextResponse.json(
        { message: parseResult.error.errors[0].message },
        { status: 400 }
      );
    }

    if (!customer) {
      return NextResponse.json({
        message: "Người dùng không Tồn tại",
      });
    }
    // Kiểm tra mật khẩu hiện tại
    if (!customer.password) {
      return NextResponse.json(
        {
          message: "Mật Khẩu hiện tại không đúng vui lòng nhập lại",
        },
        { status: 400 }
      );
    }
    //kiểm tra trùng password
    if (currentPassword === newPassword) {
      return NextResponse.json(
        {
          message: "trùng với mật khẩu cũ vui lòng nhập mật khẩu mới",
        },
        { status: 404 }
      );
    }
    // kiểm tra mật khẩu hiện tại có trùng với mật khẩu trong CSDL Không
    const changePassword = await bcrypt.compare(
      currentPassword,
      customer.password
    );

    if (!changePassword) {
      return NextResponse.json(
        { message: "Vui lòng nhập đúng mật khẩu" },
        { status: 400 }
      );
    }
    // Mã Hóa Lại Mật Khẩu Mới
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    await prisma.customer.update({
      where: { customer_id: customer?.customer_id },
      data: {
        password: newPasswordHash,
      },
    });
    return NextResponse.json(
      { message: "Mật khẩu đã được thay đổi thành công" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
