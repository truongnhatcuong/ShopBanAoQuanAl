import { Role } from "./../../../../node_modules/.prisma/client/index.d";
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
  const { name, email, phone, address, RoleId, username, password } =
    await req.json();

  try {
    //kiểm tra tồn tại username

    const createCustomer = await prisma.customer.create({
      data: {
        name,
        email,
        address,
        phone,
        roleId: 1,
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
