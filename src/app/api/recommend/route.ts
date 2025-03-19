import { fetchUserBehaviorData } from "@/lib/fetchUserBehavior";
import { recommendProducts } from "@/lib/recommendProducts";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userBehaviorData = await fetchUserBehaviorData();

    console.log("hihi", userBehaviorData);

    if (!userBehaviorData || userBehaviorData.length === 0) {
      return NextResponse.json(
        { message: "Không có dữ liệu hành vi", data: [] },
        { status: 200 }
      );
    }

    const recommendations = await recommendProducts(userBehaviorData);
    console.log("Khuyến nghị sản phẩm:", recommendations);
    return NextResponse.json({ data: recommendations }, { status: 200 });
  } catch (error) {
    console.error("Lỗi API recommend:", error);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}
