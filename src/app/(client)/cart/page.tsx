"use client";
import React, { use, useEffect, useState } from "react";
import Title from "../components/Title";
import ItemCart from "./components/ItemCart";

interface CartItem {
  cartitem_id: number;
  product_id: number;
  quantity: number;
  product: {
    product_name: string;
    price: string;
    Images: { image_url: string }[];
  };
  image_url: string;
}

interface CartData {
  cart: {
    cart_id: number;
    items: CartItem[];
  };
}

const CartPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const fetchCartData = async () => {
    const res = await fetch("/api/cart");
    const data = await res.json();
    setCart(data.cart.items || []);
  };
  useEffect(() => {
    fetchCartData();
  }, []);
  return (
    <div>
      <div className="text-2xl text-center mb-3">
        <Title title1="Danh Mục" title2="Giỏ Hàng" />
      </div>
      <div className="">
        <ItemCart items={cart} />
      </div>
    </div>
  );
};

export default CartPage;
