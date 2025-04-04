import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { authenticateToken } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // lấy token người dùng
  const token = req.cookies.get("token")?.value;
  // xác thực người dùng
  const user = await authenticateToken(token);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  //cấp quyền
  const permisionAdmin = user.role.permissions.some(
    (admin) => admin.permission.permission === "general"
  );
  if (!permisionAdmin) {
    return NextResponse.json(
      { message: "Bạn Không Có quyền truy Cập thông Tin Này" },
      { status: 401 }
    );
  }
  const data = await req.json();
  const customerId = Number(params.id);

  try {
    const updateCustomer = await prisma.customer.update({
      where: {
        customer_id: customerId,
      },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        roleId: data.roleId,
      },
    });
    return NextResponse.json(
      { updateCustomer, message: "updated success" },
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
  const customerId = Number(params.id);
  // lấy token phía cookies
  const token = req.cookies.get("token")?.value;
  // xác thực
  const user = await authenticateToken(token);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // nếu có permisson === delete thì có thể xóa
  const hasDeletePermission = user.role.permissions.some(
    (perm) => perm.permission.permission === "delete"
  );

  if (!hasDeletePermission) {
    return NextResponse.json(
      { message: "Bạn Không Có quyền truy Cập thông Tin Này" },
      { status: 403 }
    );
  }
  try {
    const deleteCustomer = await prisma.customer.delete({
      where: {
        customer_id: customerId,
      },
    });
    return NextResponse.json(
      { deleteCustomer, message: "deleted success" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
