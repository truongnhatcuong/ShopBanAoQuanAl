import prisma from "@/prisma/client";
import jwt from "jsonwebtoken";
interface DecodedToken {
  username: string;
  // Có thể thêm các trường khác nếu cần
}

const JWT_SECRET = process.env.JWT_SECRET;
export async function authenticateToken(token: string | undefined) {
  if (!token) return null;

  if (!JWT_SECRET) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    const user = await prisma.customer.findUnique({
      where: { username: decoded.username },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });
    return user; // Trả về thông tin người dùng bao gồm vai trò và quyền
  } catch (err) {
    return null;
  }
}
