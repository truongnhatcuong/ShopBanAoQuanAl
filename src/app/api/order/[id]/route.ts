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
    const admin = await authenticateToken(token);
    const hashAdmin = admin?.role.permissions.some(
      (per) => per.permission.permission === "update"
    );
    if (!hashAdmin) {
      return NextResponse.json({ message: "you not admin" }, { status: 404 });
    }

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
