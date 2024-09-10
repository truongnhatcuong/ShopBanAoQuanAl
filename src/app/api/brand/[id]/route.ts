import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const brandId = params.id;
  const brand = await prisma.brand.findUnique({
    where: { brand_id: brandId },
  });
  return NextResponse.json(
    { brand: brand, message: `found brand ${brandId}` },
    { status: 200 }
  );
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const brandId = Number(params.id);
    const data = await req.json();
    const updateBrand = await prisma.brand.update({
      where: {
        brand_id: brandId,
      },
      data: {
        brand_name: data.brand_name,
        description: data.description,
      },
    });
    return NextResponse.json(
      { updateBrand, message: "Updated Success" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 200 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const brandId = Number(params.id);
  try {
    const deleteBrand = await prisma.brand.delete({
      where: {
        brand_id: brandId,
      },
    });
    return NextResponse.json(
      { deleted: deleteBrand, message: "deleted Succed" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
