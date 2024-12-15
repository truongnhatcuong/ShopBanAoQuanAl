import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const size = await prisma.size.findMany({});
  return NextResponse.json({ size, message: "success" }, { status: 200 });
}
