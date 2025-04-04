"use client";
import React, { use, useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import ItemCart from "./components/ItemCart";
import TotalCart from "./components/TotalCart";
import { ShopConText } from "@/app/context/Context";

const CartPage = () => {
  const { cart } = useContext(ShopConText)!;
  return (
    <div className="h-screen mt-4 overflow-auto">
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
