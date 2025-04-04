import { authenticateToken } from "@/lib/auth";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { productSupplierSchema } from "../route";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const supplierId = Number(id);
  const { supplier_name, contact_info, product_id, quantity, supply_date } =
    await req.json();
  const parseResult = productSupplierSchema.safeParse({
    supplier_name,
    contact_info,
    product_id,
    quantity,
    supply_date,
  });

  if (!parseResult.success) {
    return NextResponse.json(
      {
        message: parseResult.error.errors[0].message,
      },
      { status: 400 }
    );
  }
  try {
    const updateSupplier = await prisma.supplier.update({
      where: {
        supplier_id: supplierId,
      },
      data: {
        supplier_name,
        contact_info,
        ProductSuppliers: {
          update: {
            where: {
              product_id_supplier_id: {
                supplier_id: supplierId,
                product_id,
              },
            },
            data: {
              quantity: Number(quantity),
              supply_date: new Date(supply_date),
            },
          },
        },
      },
    });
    return NextResponse.json(
      { updateSupplier, message: "updated success" },
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
  const supplierId = Number(id);
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
    const getSupplier = await prisma.supplier.delete({
      where: {
        supplier_id: supplierId,
      },
    });
    return NextResponse.json(
      { getSupplier, message: `deleted ${supplierId} success` },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
