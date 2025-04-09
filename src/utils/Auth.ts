import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/client";
const JWT_SECRET: string = process.env.JWT_SECRET || "";
export async function authCustomer(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return null;
  }
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const username = decoded.username;
    if (!username) {
      throw new Error("Invalid token");
    }
    const customer = await prisma.customer.findUnique({
      where: { username },
      select: {
        customer_id: true,
        name: true,
        email: true,
        phone: true,
        image: true,
        username: true,
        password: true,
        token: true,
        roleId: true,
      },
    });
    return customer;
  } catch (error: any) {
    console.error("Authentication error:", error.message);
  }
}
