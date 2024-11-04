import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export async function GET() {
  const getCustomer = await prisma.customer.findMany();
  return NextResponse.json(
    { getCustomer, message: "success" },
    { status: 201 }
  );
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  const hashPassword = await bcrypt.hash(data.password, 10);
  try {
    //kiểm tra tồn tại username

    const existUsername = await prisma.customer.findFirst({
      where: {
        OR: [
          {
            username: data.username,
          },
        ],
      },
    });

    if (existUsername) {
      return NextResponse.json(
        { error: "tài khoản đã tồn tại" },
        { status: 404 }
      );
    }

    const createCustomer = await prisma.customer.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        username: data.username,
        password: hashPassword,
        created_at: new Date(),
      },
    });
    return NextResponse.json(
      { createCustomer, message: "success" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
