import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const returnId = Number(id);
  const { status } = await req.json();

  if (isNaN(returnId) || !["APPROVED", "REJECTED"].includes(status)) {
    return NextResponse.json(
      {
        message: "Yêu cầu return_id hợp lệ và status (APPROVED hoặc REJECTED)",
      },
      { status: 400 }
    );
  }
  try {
    const returnProduct = await prisma.returnProduct.findUnique({
      where: {
        return_id: returnId,
      },
      include: {
        Order: {
          include: {
            OrderItems: true,
            Returns: true,
          },
        },
      },
    });
    if (!returnProduct) {
      return NextResponse.json(
        { message: "Không tìm thấy yêu cầu hoàn trả" },
        { status: 404 }
      );
    }
    if (returnProduct.return_status !== "PENDING") {
      return NextResponse.json(
        {
          message: "Yêu cầu hoàn trả này đã được xử lý trước đó",
        },
        { status: 400 }
      );
    }
    const updatedReturn = await prisma.returnProduct.update({
      where: { return_id: returnId },
      data: {
        return_status: status,
        updated_at: new Date(), // Cập nhật thời gian thay đổi
      },
    });
    if (status === "APPROVED") {
      const order = returnProduct.Order;
      const totalItems = order.OrderItems.length;
      const approvedReturns = order.Returns.filter(
        (r) => r.return_status === "APPROVED" || r.return_id === returnId
      ).length;

      let newOrderState = order.order_state;
      if (approvedReturns === totalItems) {
        newOrderState = "REFUNDED";
      } else if (approvedReturns > 0) {
        newOrderState = "PARTIALLY_REFUNDED";
      }
      await prisma.order.update({
        where: { order_id: order.order_id },
        data: {
          order_state: newOrderState,
          updated_at: new Date(),
        },
      });
      return NextResponse.json(
        {
          message: `Yêu cầu hoàn trả đã được ${
            status === "APPROVED" ? "phê duyệt" : "từ chối"
          } thành công`,
          data: updatedReturn,
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: "Đã xảy ra lỗi khi xử lý yêu cầu hoàn trả" },
      { status: 500 }
    );
  }
}
