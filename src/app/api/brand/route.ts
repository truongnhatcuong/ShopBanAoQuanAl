import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const brand = await prisma.brand.findMany();
  return NextResponse.json(
    { brand: brand, message: "Success" },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const newBrand = await prisma.brand.create({
      data: {
        brand_name: data.brand_name,
        description: data.description,
      },
    });
    return NextResponse.json(
      { brand: newBrand, message: "Success" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
