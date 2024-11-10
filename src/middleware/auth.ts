import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY =
  process.env.SECRET_KEY ||
  "yigi2u32u52fui3g2hiv54ujv745u745j8cf54yif5i4y85pogZHJXfv34yi634";

export function verifyAuth(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  console.log("token la :", token);

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  try {
    jwt.verify(token, SECRET_KEY);
    return NextResponse.next();
  } catch (error: any) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
