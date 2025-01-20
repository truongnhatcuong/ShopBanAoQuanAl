import { authenticateToken } from "@/lib/auth";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const coupon = await prisma.coupon.findMany({
    include: {
      PromotionNotifications: {
        select: {
          Notifications: {
            select: {
              Customer: {
                select: {
                  customer_id: true,
                  name: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      coupon_id: "desc",
    },
  });
  return NextResponse.json({ coupon, message: "success" }, { status: 201 });
}

export async function POST(req: NextRequest) {
  const {
    coupon_code,
    discount_type, // Thêm trường này
    discount_value, // Thêm trường này
    usage_limit,
    start_date,
    end_date,
    customerIds,
  } = await req.json();
  try {
    // kiểm tra đầu vào
    const token = await req.cookies.get("token")?.value;

    console.log(token);

    const currentDay = new Date();
    if (new Date(end_date) < currentDay) {
      return NextResponse.json(
        { message: "Mã khuyến mãi đã hết hạn." },
        { status: 404 }
      );
    }
    const user = await authenticateToken(token);
    const hasDeletePermission = user?.role.permissions.some(
      (perm) => perm.permission.permission === "create"
    );

    if (!hasDeletePermission) {
      return NextResponse.json(
        { message: "Bạn Không Có quyền truy Cập thông Tin Này" },
        { status: 403 }
      );
    }
    const existingCoupon = await prisma.coupon.findMany({
      where: { coupon_code: coupon_code },
    });
    if (existingCoupon.length > 0) {
      return NextResponse.json(
        { error: "Mã khuyến mãi đã tồn tại." },
        { status: 400 }
      );
    }

    // tạo khuyến mãi
    const coupon = await prisma.coupon.create({
      data: {
        coupon_code: coupon_code,
        coupon_percentage: discount_type === "percentage" ? discount_value : 0,
        coupon_amount: discount_type === "amount" ? discount_value : 0,
        usage_limit: usage_limit,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
      },
    });

    //tạo thông báo cho các khách hàng
    const customers = await prisma.customer.findMany({
      where: {
        customer_id: { in: customerIds },
      },
    });

    const notificationCustomers = customers.map(async (item) => {
      const messages =
        discount_type === "percentage"
          ? `Bạn có mã giảm giá mới: ${coupon_code} có giá trị ${discount_value}%`
          : `Bạn có mã giảm giá mới: ${coupon_code} có giá trị ${discount_value} VNĐ`;
      try {
        const notification = await prisma.notification.create({
          data: {
            customer_id: item.customer_id,
            notification_type: "Mã Khuyến Mãi",
            message: messages,
            is_read: false,
            created_at: new Date(),
          },
        });
        await prisma.promotionNotification.create({
          data: {
            notification_id: notification.notification_id,
            coupon_id: coupon.coupon_id,
          },
        });
      } catch (error: any) {
        console.error(
          `Lỗi khi tạo thông báo cho khách hàng ${item.customer_id}: ${error.message}`
        );
      }
    });

    const notifications = await Promise.all(notificationCustomers);
    return NextResponse.json(
      { coupon, notifications, message: "created success " },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
