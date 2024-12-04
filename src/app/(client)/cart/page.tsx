"use client";
import React, { use, useEffect, useState } from "react";
import Title from "../components/Title";
import ItemCart from "./components/ItemCart";
import TotalCart from "./components/TotalCart";

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

// interface CartData {
//   cart: {
//     cart_id: number;
//     items: CartItem[];
//   };
// }

const CartPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const fetchCartData = async () => {
    const res = await fetch("/api/cart");
    const data = await res.json();

    const updatedItems = data.cart.items.map((item: CartItem) => ({
      ...item,
      selectedSize: item.selectedSize, // Cập nhật với size mặc định hoặc giá trị từ API nếu có
    }));
    setCart(updatedItems);
  };
  useEffect(() => {
    fetchCartData();
  }, []);
  return (
    <div>
      <div className="text-2xl text-center mb-3">
        <Title title1="Danh Mục" title2="Giỏ Hàng" />
      </div>
      <div className="flex gap-9 ">
        <div className="w-3/5">
          <ItemCart items={cart} />
        </div>
        <div className="flex justify-end border border-l-2 p-3">
          <div className="w-full sm:w-[450px] text-center">
            <TotalCart />
            <button
              className="bg-black text-white text-sm py-3 px-8 my-8"
              // onClick={() => router.push("/placeOrder")}
            >
              THANH TOÁN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
