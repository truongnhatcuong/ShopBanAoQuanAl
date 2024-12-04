import { Customer } from "@prisma/client";
import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cartItem = await prisma.cartItem.findMany();
  return NextResponse.json({ cartItem, message: "success" }, { status: 201 });
}
