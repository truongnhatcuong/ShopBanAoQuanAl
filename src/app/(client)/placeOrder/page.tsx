"use client";
import React, { useEffect, useState } from "react";
import FormCheckOut from "./components/FormCheckOut";
import ChangeAddress from "./components/ChangeAddress";

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
interface ICoupon {
  coupon_id: number;
  coupon_code: string;
  coupon_percentage: string;
  coupon_amount: string;
  usage_limit: number;
  start_date: string;
  end_date: string;
  PromotionNotifications: {
    Notifications: { Customer: { customer_id: number; name: string } };
  }[];
}

const Page = () => {
  const [cart, setCart] = useState<CartData | null>(null); // ✅ Fix useState
  const [dataCoupon, setDataCoupon] = useState<ICoupon[]>([]);
  const fetchCartData = async () => {
    const res = await fetch("/api/cart", {
      cache: "no-store",
    });
    const data: CartApiResponse = await res.json();

    if (data.cart) {
      setCart(data.cart); // ✅ Lưu toàn bộ `cart`
    }
  };
  const FetchApi = async () => {
    const res = await fetch("/api/coupon");
    const data = await res.json();
    setDataCoupon(data.coupon || []);
  };

  useEffect(() => {
    fetchCartData();
    FetchApi();
  }, []);

  if (!cart) return <p>Đang tải dữ liệu...</p>; // ✅ Hiển thị loading khi chưa có dữ liệu

  return (
    <div className="flex flex-col md:flex-row justify-between">
      <div className="md:w-3/5 w-full ">
        <ChangeAddress cart={cart} />
      </div>
      <div className="md:w-2/5 w-full ">
        <FormCheckOut cart={cart} data={dataCoupon} />
      </div>
    </div>
  );
};

export default Page;
