import prisma from "@/app/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
  const customerId = Number(params.id);
  try {
    const getCustomer = await prisma.customer.findUnique({
      where: {
        customer_id: customerId,
      },
    });
    return NextResponse.json(
      { getCustomer, message: "success" },
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
        address: data.address,
        username: data.username,
        password: data.password,
        updated_at: new Date(),
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

export async function DELETE({ params }: { params: { id: string } }) {
  const customerId = Number(params.id);
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
