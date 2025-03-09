import nodemailer from "nodemailer";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
export async function POST(req: NextRequest) {
  const { email } = await req.json();
  // check email exits database
  try {
    const customer = await prisma.customer.findUnique({
      where: {
        email,
      },
    });
    if (!customer) {
      return NextResponse.json(
        { message: "Email không tồn tại trong hệ thống" },
        { status: 404 }
      );
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const updatedCustomer = await prisma.customer.update({
      where: { email },
      data: { token: hashedToken },
    });

    console.log("Token đã lưu vào database:", updatedCustomer);

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/dat-lai-mat-khau/${resetToken}`;
    const mailOptions = {
      from:
        process.env.EMAIL_FROM || '"Tên Shop Của Bạn" <no-reply@yourshop.com>',
      to: email,
      subject: "Đặt lại mật khẩu của bạn",
      html: `
          <h1>Xin chào ${customer.name || customer.username}</h1>
          <p>Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng sử dụng liên kết bên dưới để đặt lại mật khẩu của bạn.</p>
          <p>Lưu ý: Liên kết này chỉ có hiệu lực trong vòng 1 giờ.</p>
          <a href="${resetUrl}" target="_blank">Đặt lại mật khẩu</a>
          <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
        `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email đặt lại mật khẩu đã được gửi" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
