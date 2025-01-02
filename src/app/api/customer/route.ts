import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const getCustomer = await prisma.customer.findMany();

  return NextResponse.json(
    { getCustomer, message: "success" },
    { status: 201 }
  );
}
export async function POST(req: NextRequest) {
  const { name, email, phone, address } = await req.json();

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
