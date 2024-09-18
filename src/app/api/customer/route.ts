import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const getCustomer = await prisma.customer.findMany();
  return NextResponse.json(
    { getCustomer, message: "success" },
    { status: 201 }
  );
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const createCustomer = await prisma.customer.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        username: data.username,
        password: data.password,
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
