"use client";
import React, { use, useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import ItemCart from "./components/ItemCart";
import TotalCart from "./components/TotalCart";
import { ShopConText } from "@/app/context/Context";

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

const CartPage = () => {
  const { cart } = useContext(ShopConText)!;

  console.log("cart", cart);
  return (
    <div className="h-[60vh] mt-4">
      <div className="text-2xl text-center md:mb-3 mb-0   ">
        <Title title1="Danh Mục" title2="Giỏ Hàng" />
      </div>
      <div className="flex flex-col md:flex-row md:gap-9 gap-0 ">
        <div className="w-full md:w-3/5 ">
          <ItemCart items={cart} />
        </div>
        <div className="flex justify-end border border-l-2 p-3  ">
          <div className="w-full md:w-[600px] text-center">
            <TotalCart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
