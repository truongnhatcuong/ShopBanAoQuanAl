import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET: string | undefined = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("Lỗi cấu hình: JWT_SECRET không được định nghĩa");
}
const key = new TextEncoder().encode(JWT_SECRET);

const IGNORE_PATHS = [
  "/api/categories",
  "api/product",
  "/api/auth/register",
  "/api/auth/login",
  "/api/cart",
];

async function decrypt(token: string): Promise<any> {
  const { payload } = await jwtVerify(token, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function middleware(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  const token = authHeader
    ? authHeader.split(" ")[1]
    : req.cookies.get("token")?.value;

  // Truy cập tự do nếu không yêu cầu xác thực
  if (IGNORE_PATHS.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (
    req.nextUrl.pathname.startsWith("/cart") ||
    req.nextUrl.pathname.startsWith("/placeOrder") ||
    req.nextUrl.pathname.startsWith("/profile")
  )
    return token
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/login", req.url));
  // cho phép thông qua mà không cần token
  if (
    (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signUp") &&
    !token
  ) {
    return NextResponse.next();
  }
  //khi đã đăng nhập không thể vào form login or signUp
  if (
    (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signUp") &&
    token
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Đăng xuất
  if (req.nextUrl.pathname === "/logout") {
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: -1,
      path: "/",
    });
    return response;
  }

  // Bảo vệ các route yêu cầu token
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded = await decrypt(token);

    const res = await fetch("http://localhost:3000/api/auth/user", {
      method: "POST",
      body: JSON.stringify({ username: decoded.username }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error("API trả về lỗi:", await res.text());
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const data = await res.json();
    if (data.accessToken) {
      if (data.accessToken.roleId !== 3 && data.accessToken.roleId !== 2) {
        return NextResponse.redirect(new URL("/"));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Lỗi xác thực token:", error);
    return NextResponse.redirect(new URL("/login"));
  }
}

export const config = {
  matcher: [
    "/logout",
    "/profile/:path*",
    "/login",
    "/cart/:path*",
    "/signUp",
    "/admin/:path*",
    "/placeOrder",
  ],
};
