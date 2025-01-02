import prisma from "@/prisma/client";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "vui lòng đăng nhập" },
      { status: 404 }
    );
  }
  try {
    const decode: any = jwt.verify(token, JWT_SECRET);
    const username = decode.username;
    const customer = await prisma.customer.findUnique({
      where: {
        username: username,
      },
    });

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
  const token = req.cookies.get("token")?.value;
  const {
    country,
    province,
    district,
    ward,
    street_address,
    note,
    is_default,
  } = await req.json();

  if (!token) {
    return NextResponse.json(
      { message: "vui lòng đăng nhập" },
      { status: 404 }
    );
  }
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const username = decoded.username;

    const customer = await prisma.customer.findUnique({
      where: {
        username: username,
      },
    });

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
