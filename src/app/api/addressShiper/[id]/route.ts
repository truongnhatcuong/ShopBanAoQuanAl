import prisma from "@/prisma/client";
import { authCustomer } from "@/utils/Auth";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
const JWT_SECRET = process.env.JWT_SECRET || "";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const addressId = Number(id);
  const customer = await authCustomer(req);
  if (!customer)
    return NextResponse.json(
      { message: "vui lòng đăng nhập" },
      { status: 400 }
    );
  try {
    const GetOneAddress = await prisma.addressShipper.findUnique({
      where: {
        address_id: addressId,
      },
    });
    return NextResponse.json(
      { GetOneAddress, message: "thành công" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 501 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const addressId = Number(id);
  const { country, province, district, ward, street_address, note, action } =
    await req.json();

  try {
    const addressToUpdate = await prisma.addressShipper.findUnique({
      where: { address_id: addressId },
    });

    if (!addressToUpdate) {
      return NextResponse.json(
        { message: "Địa chỉ không tồn tại." },
        { status: 404 }
      );
    }
    if (action === "Update") {
      await prisma.addressShipper.update({
        where: {
          address_id: addressId,
        },
        data: { country, province, district, ward, street_address, note },
      });
      return NextResponse.json(
        { message: "Cập nhật địa chỉ thành công." },
        { status: 200 }
      );
    } else if (action === "setDefault") {
      await prisma.addressShipper.updateMany({
        where: {
          customer_id: addressToUpdate.customer_id,
        },
        data: { is_default: false },
      });
      await prisma.addressShipper.update({
        where: { address_id: addressId },
        data: { is_default: true }, // Đặt địa chỉ hiện tại làm mặc định
      });
      return NextResponse.json(
        { message: "Địa chỉ đã được đặt làm mặc định." },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "lỗi." }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 501 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const addressId = Number(id);
  const customer = await authCustomer(req);
  if (!customer)
    return NextResponse.json(
      { message: "vui lòng đăng nhập" },
      { status: 400 }
    );

  try {
    await prisma.addressShipper.delete({
      where: {
        address_id: addressId,
      },
    });
    const remainingAddresses = await prisma.addressShipper.findMany({
      where: { customer_id: customer?.customer_id },
    });
    if (remainingAddresses.length === 1) {
      await prisma.addressShipper.update({
        where: {
          address_id: remainingAddresses[0].address_id,
        },
        data: {
          is_default: true,
        },
      });
    }
    return NextResponse.json(
      { message: "Địa chỉ đã được xóa thành công." },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 501 });
  }
}
