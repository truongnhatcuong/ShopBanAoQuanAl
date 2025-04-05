import { authenticateToken } from "@/lib/auth";
import prisma from "@/prisma/client";
import { authCustomer } from "@/utils/Auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const orderId = Number(id);
  const customer = await authCustomer(req);
  try {
    const getOrderId = await prisma.order.findUnique({
      where: {
        order_id: orderId,
        customer_id: customer?.customer_id,
      },
      select: {
        OrderItems: {
          include: {
            Size: true,
            Product: {
              include: {
                Images: {
                  take: 1,
                },
              },
            },
          },
        },
      },
    });
    const token = req.cookies.get("token")?.value;
    // kiem tra admin
    const user = await authenticateToken(token);
    const hashAdmin = user?.some(
      (item) => item.permission.permission === "update"
    );
    if (!hashAdmin)
      return NextResponse.json(
        { message: "bạn không có quyền truy cập" },
        { status: 400 }
      );

    // order admin
    const OrderManage = await prisma.order.findUnique({
      where: {
        order_id: orderId,
      },
      select: {
        order_id: true,
        order_date: true,
        total_amount: true,
        order_state: true,
        Customer: {
          select: {
            name: true,
            phone: true,
            AddressShipper: {
              select: {
                country: true,
                is_default: true,
                province: true,
                district: true,
                ward: true,
                street_address: true,
                note: true,
              },
              where: {
                is_default: true,
              },
            },
          },
        },
        OrderItems: {
          select: {
            orderitem_id: true,
            quantity: true,
            price: true,
            Product: {
              select: {
                product_name: true,
                Images: {
                  take: 1,
                  select: {
                    image_url: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return NextResponse.json(
      { getOrderId, OrderManage, message: `found Id ${orderId} success` },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const orderId = Number(id);
  try {
    await prisma.orderItem.deleteMany({
      where: {
        order_id: orderId,
      },
    });
    await prisma.payment.deleteMany({
      where: {
        order_id: orderId,
      },
    });
    // Sau đó xóa Order
    const deletedOrder = await prisma.order.delete({
      where: {
        order_id: orderId,
      },
    });

    return NextResponse.json(
      { deletedOrder, message: `deleted success` },
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
  const orderId = Number(id);
  const { payment_status, order_state } = await req.json();
  const user = await authenticateToken(token);

  const hashAdmin = user?.some(
    (item) => item.permission.permission === "update"
  );
  if (!hashAdmin)
    return NextResponse.json(
      { message: "bạn không có quyền truy cập" },
      { status: 400 }
    );

  try {
    const update = await prisma.order.update({
      where: {
        order_id: orderId,
      },
      data: {
        order_state: order_state,
        order_date: new Date(),
        Payments: {
          updateMany: {
            where: { order_id: orderId },
            data: {
              payment_status: payment_status,
            },
          },
        },
      },
      include: {
        Payments: true,
      },
    });
    return NextResponse.json(
      { update, message: "cập nhật thành công" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 501 });
  }
}
