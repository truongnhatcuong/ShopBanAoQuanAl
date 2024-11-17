import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const getproduct = await prisma.$queryRaw`SELECT * FROM product`;
  return NextResponse.json({ getproduct });
}
