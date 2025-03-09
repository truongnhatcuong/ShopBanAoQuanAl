/// middleware
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET: string | undefined = process.env.JWT_SECRET || "";
const key = new TextEncoder().encode(JWT_SECRET);
import { jwtVerify } from "jose";

export async function decrypt(token: string): Promise<any> {
  const { payload } = await jwtVerify(token, key, {
    algorithms: ["HS256"],
  });

  return payload;
}

export async function middleware(req: NextRequest) {
  // Lấy token từ Authorization header hoặc từ cookie
  const authHeader = req.headers.get("Authorization");
  const token = authHeader
    ? authHeader.split(" ")[1]
    : req.cookies.get("token")?.value;

  // Kiểm tra nếu đã đăng nhập thì không cho vào Đăng Nhập và Đăng Kí
  if (
    (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signUp") &&
    token
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  // có thể đi vào login mà k cần token
  if (
    req.nextUrl.pathname === "/login" ||
    (req.nextUrl.pathname === "/signUp" && !token)
  ) {
    return NextResponse.next();
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
    req.nextUrl.pathname.startsWith("/product") ||
    req.nextUrl.pathname.startsWith("/cart") ||
    req.nextUrl.pathname.startsWith("/profile")
  )
    return token
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/login", req.url));

  // Nếu không có token, chuyển hướng đến trang đăng nhập
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Kiểm tra nếu JWT_SECRET chưa được thiết lập
  if (!JWT_SECRET) {
    return NextResponse.json(
      { message: "Lỗi cấu hình: JWT_SECRET không được định nghĩa" },
      { status: 500 }
    );
  }

  try {
    // Giải mã token để lấy thông tin người dùng
    const decoded: any = await decrypt(token);

    //tai day send api den thang kia
    const res = await fetch("http://localhost:3000/api/auth/user", {
      method: "POST",
      body: JSON.stringify({ username: decoded.username }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    // kiểm vai trò 1:user , 2 staff, 3 admin ==> trong database
    if (data.accessToken.roleId !== 3) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (!data) {
      return NextResponse.redirect(new URL("/", req.url));
    }
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
    "/admin/:path*",
    "/product/:path*",
  ],
};
