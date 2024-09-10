import prisma from "@/app/prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const brand = await prisma.brand.findMany();
  return NextResponse.json(
    { brand: brand, message: "Success" },
    { status: 200 }
  );
}

export async function POST(req: Request) {
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
