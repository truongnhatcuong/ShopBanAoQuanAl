import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json();

    if (!username) {
      return NextResponse.json(
        { message: "Username is required" },
        { status: 400 }
      );
    }

    const data = await prisma.customer.findUnique({
      where: {
        username: username,
      },
    });
    if (!data) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ accessToken: data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
