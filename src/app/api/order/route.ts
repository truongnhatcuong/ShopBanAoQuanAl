import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const getOrder = await prisma.order.findMany();
  return NextResponse.json({ getOrder, message: "success" }, { status: 201 });
}

export async function POST(req: NextRequest) {}
