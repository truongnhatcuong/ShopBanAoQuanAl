/// middleware không hỗ trợ prisma
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/decrypt";

const JWT_SECRET: string | undefined = process.env.JWT_SECRET || "";

export async function middleware(req: NextRequest) {
  // Lấy token từ Authorization header hoặc từ cookie
  const authHeader = req.headers.get("Authorization");
  const token = authHeader
    ? authHeader.split(" ")[1]
    : req.cookies.get("token")?.value;

  if (
    (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signUp") &&
    !token
  ) {
    return NextResponse.next();
  }

  // Giải mã token để lấy thông tin người dùng
  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  const decoded: any = await decrypt(token);

  // Kiểm tra nếu đã đăng nhập thì không cho vào Đăng Nhập và Đăng Kí
  if (
    (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signUp") &&
    token
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

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
  if (
    req.nextUrl.pathname.startsWith("/cart") ||
    req.nextUrl.pathname.startsWith("/profile")
  )
    return token
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/login", req.url));

  // Kiểm tra nếu JWT_SECRET chưa được thiết lập
  if (!JWT_SECRET) {
    return NextResponse.json(
      { message: "Lỗi cấu hình: JWT_SECRET không được định nghĩa" },
      { status: 500 }
    );
  }
  //

  try {
    // if (req.nextUrl.pathname.startsWith("/admin") && decoded.roleId < 2) {
    //   return NextResponse.redirect(new URL("/", req.url));
    // }

    return NextResponse.next();
  } catch (error) {
    console.error("Lỗi khi kiểm tra token:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/logout",
    "/profile/:path*",
    "/login",
    "/signUp",
    "/cart",
    "/admin/:path*",
  ],
};
