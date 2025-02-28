/* eslint-disable @next/next/no-img-element */
"use client";
import { QRCodeCanvas } from "qrcode.react";
import React, { useContext, useEffect, useState } from "react";
import { ShopConText } from "@/app/context/Context";
import { ForMatPrice } from "@/lib/FormPrice";

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
}

const QRCode = () => {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartData | null>(null);
  const [qrError, setQrError] = useState<string | null>(null);
  const [valueData, setValueData] = useState({
    id: 0,
    customer: "",
  });

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await fetch(`/api/cart`);
        const data = await res.json();
        if (res.ok) {
          setCart(data.cart);
          setValueData({
            id: data.idOrderNext,
            customer: data.customer,
          });
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu đơn hàng:", error);
        setQrError("Không thể tải dữ liệu giỏ hàng");
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, []);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (!cart || cart.items.length === 0)
    return <p>Không có sản phẩm trong giỏ hàng.</p>;
  if (qrError) return <p className="text-red-500">{qrError}</p>;

  // Using MB Bank specific format with alternative image types
  const vietQR = `https://img.vietqr.io/image/MB-0372204152-qr_only_large.png?addInfo=${encodeURIComponent(
    `MaDonHang#${valueData.id + 1} - ${valueData.customer} Thanh Toán `
  )}`;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <img src={vietQR} alt="QR Code" className="w-56 h-56 object-contain" />
        <p className="text-center text-sm font-bold">
          Đơn hàng #{valueData.id + 1} - {cart.items.length} sản phẩm
        </p>

        <p className="text-center text-xs text-gray-600">
          MB Bank - 0372204152
        </p>
        <p className="text-lg font-semibold text-gray-800">
          Vui lòng nhập đúng số tiền{" "}
        </p>
      </div>
    </div>
  );
};

export default QRCode;
