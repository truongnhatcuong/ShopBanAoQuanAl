import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET: string | undefined = process.env.JWT_SECRET || "";
const key = new TextEncoder().encode(JWT_SECRET);
import { jwtVerify, SignJWT } from "jose";
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

  console.log(token);
  // duoc r nay
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
    console.log(decoded);
    // do module jwt no ho tro tren node thoi
    // Kiểm tra người dùng trong cơ sở dữ liệu bằng Prisma
    // const user = await prisma.customer.findUnique({
    //   where: { username: decoded.username },
    // });
    //tai day send api den thang kia
    const res = await fetch("http://localhost:3000/api/auth/user", {
      method: "POST",
      body: JSON.stringify({ username: decoded.username }),
    });
    const user_server = await res.json();
    console.log(user_server);
    // if(user_server.token == token){
    //   //// handle gi day
    //   // tu implement not nhe
    // }
    // loi con lai do thanh prisma nhe
    // bac luu token o database len bac chi can query tren database
    // decoded ra la ro thu vien no dang loi
    // cho de e nghix
    // console.log("user", user);
    // Nếu người dùng không tồn tại, chuyển hướng đến trang đăng nhập
    if (!user_server) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // Nếu người dùng tồn tại, tiếp tục xử lý yêu cầu
    // (req as any).customer = user; // Lưu thông tin người dùng vào req.customer
    return NextResponse.next();
    //bac run no o dau day
  } catch (error) {
    console.error("Lỗi khi kiểm tra token:", error);
    // Nếu token không hợp lệ, chuyển hướng đến đăng nhập
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Cấu hình matcher để middleware chỉ áp dụng cho các route bắt đầu với '/admin'
export const config = {
  matcher: ["/admin/:path*"],
};
