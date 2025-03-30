import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");
import Fuse from "fuse.js"; // Thêm Fuse.js
import { authCustomer } from "@/utils/Auth";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

// Danh sách từ khóa (chuyển regex thành chuỗi để Fuse.js xử lý)
const ORDER_KEYWORDS = [
  "đơn hàng",
  "kiểm tra đơn hàng",
  "theo dõi đơn hàng",
  "đơn của tôi",
  "đơn đâu",
  "đơn hàng của tôi",
];
const PRODUCT_KEYWORDS = [
  "shop có áo không",
  "cửa hàng có quần không",
  "sản phẩm của shop",
  "sản phẩm này còn hàng không",
  "bạn có bán giày không",
  "shop có những sản phẩm nào",
];
const SIZE_KEYWORDS = ["size bao nhiêu", "mình cao 1m70 nặng 60kg mặc size gì"];
const PAYMENT_KEYWORDS = ["có hỗ trợ trả góp không", "có cod không"];
const SHIPPING_KEYWORDS = [
  "phí ship",
  "bao lâu nhận hàng",
  "tôi muốn đổi hàng",
];
const CONTACT_KEYWORDS = ["địa chỉ shop ở đâu", "số điện thoại hỗ trợ"];
const FASHION_ADVICE_KEYWORDS = ["mặc gì để đi chơi", "mix đồ với quần jeans"];

// Cấu hình Fuse.js cho từng danh sách từ khóa
const fuseOptions = {
  threshold: 0.8, // Độ "mờ" (0.0 = chính xác hoàn toàn, 1.0 = rất lỏng lẻo)
  includeScore: true, // Trả về điểm số tương đồng
};

const fuseOrder = new Fuse(ORDER_KEYWORDS, fuseOptions);
const fuseProduct = new Fuse(PRODUCT_KEYWORDS, fuseOptions);
const fuseSize = new Fuse(SIZE_KEYWORDS, fuseOptions);
const fusePayment = new Fuse(PAYMENT_KEYWORDS, fuseOptions);
const fuseShipping = new Fuse(SHIPPING_KEYWORDS, fuseOptions);
const fuseContact = new Fuse(CONTACT_KEYWORDS, fuseOptions);
const fuseFashion = new Fuse(FASHION_ADVICE_KEYWORDS, fuseOptions);

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    const user = await authCustomer(req);

    if (!user)
      return NextResponse.json(
        { message: "vui lòng đăng nhập xem đơn hàng của bạn !" },
        { status: 404 }
      );
    if (!message) {
      return NextResponse.json(
        { error: "Vui lòng nhập câu hỏi!" },
        { status: 400 }
      );
    }

    // Hàm kiểm tra fuzzy matching
    const checkFuzzyMatch = (fuseInstance: any) => {
      const result = fuseInstance.search(message);
      return result.length > 0 && result[0].score < 0.4 ? result[0].item : null;
    };

    // ✅ Kiểm tra đơn hàng với fuzzy matching
    const orderMatch = checkFuzzyMatch(fuseOrder);
    if (orderMatch) {
      const order = await prisma.order.findFirst({
        where: { customer_id: user?.customer_id },
        orderBy: { order_date: "desc" },
        include: {
          OrderItems: {
            include: {
              Product: { include: { Images: true, Brand: true } },
              Size: true,
            },
          },
        },
      });

      if (!order) {
        return NextResponse.json(
          { reply: "Bạn chưa có đơn hàng nào." },
          { status: 200 }
        );
      }
      const products = order.OrderItems.map((item) => ({
        id: item.Product.product_id,
        name: item.Product.product_name,
        price: Number(item.Product.price),
        image: item.Product.Images[0]?.image_url || "",
        quantity: item.quantity,
        size: item.Size ? item.Size.name_size : "Không rõ",
      }));

      return NextResponse.json(
        {
          reply: `Đơn hàng mới nhất của bạn đang ở trạng thái: ${order.order_state}.`,
          products,
        },
        { status: 200 }
      );
    }

    // ✅ Kiểm tra sản phẩm với fuzzy matching
    const productMatch = checkFuzzyMatch(fuseProduct);
    if (productMatch) {
      const products = await prisma.product.findMany({
        select: {
          product_id: true,
          product_name: true,
          price: true,
          Images: { take: 1 },
          ProductSizes: { select: { Size: true, stock_quantity: true } },
        },
        take: 5,
      });

      if (!products.length) {
        return NextResponse.json(
          { reply: "Hiện tại shop không có sản phẩm nào." },
          { status: 200 }
        );
      }

      const formattedProducts = products.map((p) => ({
        id: p.product_id,
        name: p.product_name,
        price: p.price,
        image: p.Images[0].image_url,
        stock: p.ProductSizes.reduce(
          (total, item) => Number(item.stock_quantity) + total,
          0
        ),
      }));

      return NextResponse.json(
        {
          reply: "Dưới đây là một số sản phẩm của shop:",
          products: formattedProducts,
        },
        { status: 200 }
      );
    }

    // ✅ Xác định loại câu hỏi khác với fuzzy matching
    let context =
      "Xin chào! Tôi là trợ lý hỗ trợ khách hàng về thời trang và quần áo. Nếu bạn cần tư vấn về sản phẩm, size, giá cả hay cách phối đồ, tôi rất sẵn lòng giúp đỡ.";

    if (checkFuzzyMatch(fuseSize)) context += " Hãy tư vấn chọn size.";
    else if (checkFuzzyMatch(fusePayment))
      context += " Hãy cung cấp thông tin thanh toán.";
    else if (checkFuzzyMatch(fuseShipping))
      context += " Hãy trả lời về vận chuyển.";
    else if (checkFuzzyMatch(fuseContact))
      context += " Hãy cung cấp thông tin liên hệ.";
    else if (checkFuzzyMatch(fuseFashion))
      context += " Hãy tư vấn về thời trang.";

    // ✅ Gửi câu hỏi đến Google Gemini AI
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent({
      contents: [
        { role: "model", parts: [{ text: context }] },
        { role: "user", parts: [{ text: message }] },
      ],
    });

    const replyText = result?.response?.candidates?.[0]?.content?.parts;

    return NextResponse.json({ result: replyText }, { status: 200 });
  } catch (error) {
    console.error("Lỗi chatbot:", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi khi xử lý yêu cầu." },
      { status: 500 }
    );
  }
}
