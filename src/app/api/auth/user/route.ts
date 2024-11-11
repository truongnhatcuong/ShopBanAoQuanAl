// implement get user?
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/prisma/client";

export async function POST(req: NextRequest) {
  const { username } = await req.json();
  console.log("username", username);
  const data = await prisma.customer.findUnique({
    where: {
      username,
    },
  });
  return NextResponse.json({ accessToken: data }, { status: 201 });
}
