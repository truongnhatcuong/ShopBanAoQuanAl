import prisma from "@/prisma/client";
import { authCustomer } from "@/utils/Auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const customer = await authCustomer(req);
  try {
    const addressShiper = await prisma.customer.findUnique({
      where: {
        customer_id: customer?.customer_id,
      },

      select: {
        name: true,
        phone: true,
        AddressShipper: { orderBy: { is_default: "desc" } },
      },
    });
    return NextResponse.json(
      { addressShiper, message: "success" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 501 });
  }
}
export async function POST(req: NextRequest) {
  const customer = await authCustomer(req);
  const {
    country,
    province,
    district,
    ward,
    street_address,
    note,
    is_default,
  } = await req.json();

  try {
    if (!customer)
      return NextResponse.json(
        { message: "vui lòng đăng nhập" },
        { status: 400 }
      );
    //kiểm tra xem khách hàng tồn tại địa chỉ address chưa
    const exitsAddress = await prisma.addressShipper.findMany({
      where: { customer_id: customer?.customer_id },
    });

    if (exitsAddress.length === 3) {
      return NextResponse.json(
        {
          message: "Bạn Chỉ có thể lưu tối đa 3 địa chỉ",
        },
        { status: 404 }
      );
    }

    let defaultFlag = is_default || false;
    if (exitsAddress.length === 0) {
      defaultFlag = true;
    }

    if (defaultFlag) {
      await prisma.addressShipper.updateMany({
        where: { customer_id: customer?.customer_id, is_default: true },
        data: { is_default: false },
      });
    }

    const addressShiper = await prisma.addressShipper.create({
      data: {
        customer_id: Number(customer?.customer_id),
        country,
        province,
        district,
        ward,
        street_address,
        note,
        is_default: defaultFlag,
      },
    });
    return NextResponse.json(
      { addressShiper, message: "success" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 501 });
  }
}
