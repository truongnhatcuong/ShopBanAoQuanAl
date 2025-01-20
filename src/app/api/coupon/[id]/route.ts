import { authenticateToken } from "@/lib/auth";
import prisma from "@/prisma/client";
import { authCustomer } from "@/utils/Auth";
import { Item } from "@radix-ui/react-dropdown-menu";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const couponId = await Number(params.id);
  try {
    const promotionNotifications = await prisma.promotionNotification.findMany({
      where: {
        coupon_id: couponId,
      },
    });

    await prisma.promotionNotification.deleteMany({
      where: {
        coupon_id: couponId,
      },
    });
    const notificationIds = promotionNotifications.map(
      (pn) => pn.notification_id
    );
    if (notificationIds.length > 0) {
      await prisma.notification.deleteMany({
        where: {
          notification_id: { in: notificationIds },
        },
      });
    }

    const Coupon = await prisma.coupon.delete({
      where: {
        coupon_id: couponId,
      },
    });

    return NextResponse.json(
      { Coupon, message: `Delete id ${couponId} success` },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = await req.cookies.get("token")?.value;
  const { id } = await params;
  const couponId = Number(id);
  const customer = await authCustomer(req);
  const user = await authenticateToken(token);
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
    const currentDay = new Date();
    if (currentDay > new Date(end_date)) {
      return NextResponse.json(
        { message: "Mã khuyến mãi đã hết hạn." },
        { status: 404 }
      );
    }

    const authCustomer = await prisma.customer.findFirst({
      where: {
        name: customer?.name,
      },
    });
    if (!authCustomer) {
      return NextResponse.json({ message: "error" }, { status: 404 });
    }

    const hasUpdatePermission = user?.role.permissions.some(
      (item) => item.permission.permission === "update"
    );
    // if (!hasUpdatePermission) {
    //   return NextResponse.json(
    //     { message: "Bạn Không Có quyền truy Cập thông Tin Này" },
    //     { status: 403 }
    //   );
    // }
    // check exist coupon
    const existingCoupon = await prisma.coupon.findUnique({
      where: {
        coupon_id: couponId,
      },
    });
    if (!existingCoupon) {
      return NextResponse.json(
        { message: "Mã Khuyến Mãi Không Tồn Tại" },
        { status: 404 }
      );
    }
    // update coupon
    const updateCoupon = await prisma.coupon.update({
      where: {
        coupon_id: couponId,
      },
      data: {
        coupon_code: coupon_code,
        coupon_percentage:
          discount_type === "percentage" ? Number(discount_value) : 0,
        coupon_amount: discount_type === "amount" ? Number(discount_value) : 0,
        usage_limit: usage_limit,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
      },
    });
    // thay doi thong bao coupon
    const uniqueCustomerIds: number[] = Array.from(new Set(customerIds));
    const customers = await prisma.customer.findMany({
      where: {
        customer_id: { in: uniqueCustomerIds },
      },
    });
    const invalidIds = uniqueCustomerIds.filter(
      (id) => !customers.some((customer) => customer.customer_id === id)
    );
    if (invalidIds.length > 0) {
      return NextResponse.json(
        { message: `ID khách hàng không hợp lệ: ${invalidIds}` },
        { status: 400 }
      );
    }
    const notificationCustomers = customers.map(async (item: any) => {
      const existingNotification = await prisma.promotionNotification.findFirst(
        {
          where: {
            coupon_id: updateCoupon.coupon_id,
            Notifications: {
              customer_id: item.customer_id,
            },
          },
        }
      );
      if (!existingNotification) {
        const messages =
          discount_type === "percentage"
            ? `Mã giảm giá ${coupon_code} đã được cập nhật với giá trị ${discount_value}%`
            : `Mã giảm giá ${coupon_code} đã được cập nhật với giá trị ${discount_value} VNĐ`;
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
              coupon_id: updateCoupon.coupon_id,
            },
          });
        } catch (error: any) {
          console.error(
            `Lỗi khi tạo thông báo cho khách hàng ${item.customer_id}: ${error.message}`
          );
        }
      }
    });
    await Promise.all(notificationCustomers);

    return NextResponse.json(
      { updateCoupon, message: "Cập nhật thành công" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 501 });
  }
}
