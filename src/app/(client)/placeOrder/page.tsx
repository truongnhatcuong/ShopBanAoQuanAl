"use client";
import React, { useEffect, useState } from "react";
import FormCheckOut from "./components/FormCheckOut";
import ChangeAddress from "./components/ChangeAddress";

interface CartItem {
  cartitem_id: number;
  product_id: number;
  quantity: number;
  selectedSize: string; // Thêm thuộc tính selectedSize
  product: {
    product_name: string;
    price: string;
    Images: { image_url: string }[];
  };
  image_url: string;
}

const Page = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const fetchCartData = async () => {
    const res = await fetch("/api/cart");
    const data = await res.json();

    const updatedItems =
      data.cart?.items?.map((item: CartItem) => ({
        ...item,
        selectedSize: item.selectedSize, // Cập nhật với size mặc định hoặc giá trị từ API nếu có
      })) || [];
    setCart(updatedItems || null);
  };
  useEffect(() => {
    fetchCartData();
  }, []);
  return (
    <div className="flex flex-col md:flex-row justify-between">
      <div className="md:w-3/5 w-full ">
        <ChangeAddress />
      </div>
      <div className="md:w-2/5 w-full ">
        <FormCheckOut cart={cart} />
      </div>
    </div>
  );
};

export default Page;
