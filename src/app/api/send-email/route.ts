import { authCustomer } from "@/utils/Auth";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Cấu hình SMTP (dùng Gmail hoặc dịch vụ email khác)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Email của bạn
    pass: process.env.EMAIL_PASS, // Mật khẩu hoặc App Password
  },
});

export async function POST(req: NextRequest) {
  try {
    const { subject, message } = await req.json();
    const customer = await authCustomer(req);

    if (!subject || !message) {
      return NextResponse.json({ error: "Thiếu dữ liệu" }, { status: 400 });
    }

    // Cấu hình email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: customer?.email,
      subject,
      text: message,
    };

    // Gửi email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        message: "Email đã gửi thành công",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lỗi gửi email:", error);
    return NextResponse.json({ error: "Gửi email thất bại" }, { status: 500 });
  }
}
