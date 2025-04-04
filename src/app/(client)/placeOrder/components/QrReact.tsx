/* eslint-disable @next/next/no-img-element */
"use client";
import { ShopConText } from "@/app/context/Context";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

interface CartItem {
  cartitem_id: number;
  product_id: number;
  quantity: number;
  selectedSize: string;
  product: {
    product_name: string;
    price: string;
    Images: { image_url: string }[];
  };
}

interface CartData {
  cart_id: number;
  items: CartItem[];
  customer: string;
  idOrderNext: number;
}

interface CartApiResponse {
  cart: CartData;
}

const QRCode = ({ cart }: CartApiResponse) => {
  const { finalTotal } = useContext(ShopConText)!;
  const [valueData, setValueData] = useState("");

  useEffect(() => {
    if (cart) {
      setValueData(cart.customer);
    }
  }, [cart]); // Cập nhật khi cart thay đổi

  if (!cart || cart.items.length === 0)
    return <p>Không có sản phẩm trong giỏ hàng.</p>;

  const vietQR = `https://img.vietqr.io/image/MB-0372204152-qr_only_large.png?amount=${finalTotal}&addInfo=${encodeURIComponent(
    `khách hàng ${valueData} Thanh Toán`
  )}`;

  return (
    <div className="flex flex-col items-center gap-6 py-2 bg-white rounded-xl shadow-lg max-w-sm mx-auto">
      <Image
        width={200}
        height={200}
        src={vietQR}
        alt="QR Code"
        className="w-[300px] h-64 object-contain rounded-md border border-gray-200 p-2 bg-gray-50"
        onError={() => console.error("Lỗi tải QR Code từ VietQR")}
      />
      <div className="text-center space-y-3">
        <p className="text-base font-bold text-gray-900">
          Đơn hàng của <span className="text-indigo-600">{cart.customer}</span>
          <br />
          Bao gồm: <span className="text-indigo-600">
            {cart.items.length}
          </span>{" "}
          sản phẩm
        </p>
        <p className="text-sm text-gray-500 tracking-wide">
          MB Bank - 0372204152
        </p>
        <p className="text-xl font-semibold text-gray-800 bg-yellow-100 px-4 py-2 rounded-md">
          Vui lòng nhập đúng số tiền
        </p>
      </div>
    </div>
  );
};

export default QRCode;
