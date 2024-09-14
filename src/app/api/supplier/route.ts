import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supplier = await prisma.supplier.findMany();
  return NextResponse.json(
    { supplier, message: "Get supplier success " },
    { status: 201 }
  );
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const newSupplier = await prisma.supplier.create({
      data: {
        supplier_name: data.supplier_name,
        contact_info: data.contact_info,
      },
    });
    return NextResponse.json(
      { newSupplier, message: "created success" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
