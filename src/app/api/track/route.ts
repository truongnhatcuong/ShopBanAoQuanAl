import prisma from "@/prisma/client";
import { authCustomer } from "@/utils/Auth";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const behaviors = await prisma.userBehavior.findMany();

    if (!behaviors.length) {
      return NextResponse.json(
        { message: "Không có dữ liệu hành vi" },
        { status: 404 }
      );
    }

    // Lấy danh sách sản phẩm duy nhất (để lập chỉ mục)
    const uniqueProducts = [...new Set(behaviors.map((b) => b.productId))];

    // Tạo Map để lưu dữ liệu hành vi của từng user
    const userBehaviorMap = new Map<number, number[]>();

    behaviors.forEach(({ userId, productId, action }) => {
      if (!userBehaviorMap.has(userId)) {
        userBehaviorMap.set(userId, new Array(uniqueProducts.length).fill(0));
      }

      // Xác định index của sản phẩm
      const productIndex = uniqueProducts.indexOf(productId);

      // Cập nhật điểm hành vi (view < add_to_cart < purchase)
      const currentData = userBehaviorMap.get(userId)!;
      currentData[productIndex] = Math.max(
        currentData[productIndex],
        action === "purchase" ? 2 : action === "add_to_cart" ? 1 : 0
      );

      userBehaviorMap.set(userId, currentData);
    });

    // Chuyển từ Map thành mảng 2D
    const userBehaviorData = Array.from(userBehaviorMap.values());

    return NextResponse.json(
      { behaviorMatrix: userBehaviorData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lỗi API:", error);
    return NextResponse.json({ message: "Lỗi server", error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { productId, action } = await req.json();

  const customer = await authCustomer(req);
  if (!customer) {
    return NextResponse.json(
      { message: "người dùng chưa đăng nhập" },
      { status: 400 }
    );
  }
  await prisma.userBehavior.create({
    data: { userId: customer?.customer_id!, productId, action },
  });
  return NextResponse.json(
    { message: "Tracked successfully" },
    { status: 200 }
  );
}
