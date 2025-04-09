import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/client";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const data = await prisma.customer.findMany();
  return NextResponse.json({ accessToken: data }, { status: 201 });
}

const userSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Tên không được để trống" })
    .max(100, { message: "Tên không được quá 100 ký tự" })
    .regex(/^[A-Za-zÀ-ỹ\s]+$/, {
      message: "Tên không được chứa số hoặc ký tự đặc biệt",
    }),

  email: z.string().email({ message: "Địa chỉ email không hợp lệ" }),
  phone: z
    .string()
    .min(10, { message: "Số điện thoại phải có ít nhất 10 ký tự" })
    .max(11, { message: "Số điện thoại không được vượt quá 11 ký tự" })
    .regex(/^(?!([0-9])\1{9,10}$)[0-9]+$/, {
      message: "Số điện thoại không hợp lệ",
    }),
  password: z
    .string()
    .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
    .max(20, { message: "Mật khẩu không được vượt quá 20 ký tự" }),
  username: z
    .string()
    .min(3, { message: "Tên người dùng phải có ít nhất 3 ký tự" })
    .max(20, { message: "Tên người dùng không được vượt quá 20 ký tự" }),
});

const JWT_SECRET = process.env.JWT_SECRET;
export async function POST(req: NextRequest) {
  const { name, email, phone, password, username } = await req.json();

  // Kiểm tra sự tồn tại của email và username
  const exitEmail = await prisma.customer.findUnique({
    where: {
      email,
    },
    select: { email: true },
  });

  const exitUsername = await prisma.customer.findUnique({
    where: {
      username,
    },
    select: { username: true },
  });

  // Kiểm tra nếu email đã tồn tại
  if (exitEmail) {
    return NextResponse.json({ message: "Email đã tồn tại!" }, { status: 400 });
  }

  // Kiểm tra nếu username đã tồn tại
  if (exitUsername) {
    return NextResponse.json(
      { message: "Username đã tồn tại!" },
      { status: 400 }
    );
  }

  const parseResult = userSchema.safeParse({
    name,
    email,
    phone,
    password,
    username,
  });
  if (!parseResult.success) {
    return NextResponse.json(
      {
        error: "Dữ liệu không hợp lệ",
        message: parseResult.error.errors[0].message,
      },
      { status: 400 }
    );
  }

  const hashPassword = bcrypt.hashSync(password, 10);
  if (!JWT_SECRET) {
    return NextResponse.json(
      { error: "JWT_SECRET is not defined" },
      { status: 500 }
    );
  }
  try {
    const accessToken = jwt.sign({ username: username }, JWT_SECRET, {
      expiresIn: "1h",
    });
    await prisma.customer.create({
      data: {
        name,
        email,
        phone,
        username,
        password: hashPassword,
        token: accessToken,
        roleId: 1,
      },
    });
    return NextResponse.json(
      { accessToken: accessToken, message: "dang ki thanh cong" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 501 });
  }
}
