import prisma from "@/app/prisma/client";
import { verifyAuth } from "./middleware/auth";
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextResponse, NextFetchEvent } from "next/server";

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const clerkResult = await clerkMiddleware(req, event);

  if (!clerkResult) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return verifyAuth(req);
}

export const config = {
  matcher: [
    "/product/:path*", // Áp dụng middleware cho route có /product
    "/admin/:path*", // Các route cần bảo vệ khác
  ],
};
