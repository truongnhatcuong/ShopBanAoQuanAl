import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/app/prisma/client";

export async function GET(req: NextRequest) {
  const data = await prisma.customer.findMany();
  return NextResponse.json({ accessToken: data }, { status: 201 });
}
const JWT_SECRET = process.env.JWT_SECRET;
export async function POST(req: NextRequest) {
  const data = await req.json();
  const hashPassword = bcrypt.hashSync(data.password, 10);
  if (!JWT_SECRET) {
    return NextResponse.json(
      { error: "JWT_SECRET is not defined" },
      { status: 500 }
    );
  }
  try {
    const accessToken = jwt.sign({ username: data.username }, JWT_SECRET, {
      expiresIn: "1h",
    });
    await prisma.customer.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address || null,
        username: data.username,
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
