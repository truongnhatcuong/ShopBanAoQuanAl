import { NextRequest, NextResponse } from "next/server";
import { authCustomer } from "@/utils/Auth";

export async function GET(req: NextRequest) {
  const user = await authCustomer(req);
  try {
    if (!user)
      return NextResponse.json(
        { message: "vui lòng đăng nhập" },
        { status: 400 }
      );
    return NextResponse.json({ accessToken: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }
}
