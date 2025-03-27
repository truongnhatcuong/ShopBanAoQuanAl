import { fetchUserBehaviorData } from "@/lib/fetchUserBehavior";
import { recommendProducts } from "@/lib/recommendProducts";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userBehaviorData = await fetchUserBehaviorData();

    if (!userBehaviorData || userBehaviorData.length === 0) {
      return NextResponse.json(
        { message: "Không có dữ liệu hành vi", data: [] },
        { status: 200 }
      );
    }

    const recommendations = await recommendProducts(userBehaviorData);

    return NextResponse.json({ data: recommendations }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}
