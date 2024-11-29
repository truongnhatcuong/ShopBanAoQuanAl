/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { ShopConText } from "@/app/context/Context";
import React, { useContext, useEffect, useState } from "react";

interface IProduct {
  product_id: number;
  stock_quantity: number;
}

interface IProps {
  product: IProduct;
}

const AddToCart = ({ product }: IProps) => {
  const { handleAddToCart } = useContext(ShopConText)!;
  const [quantity, setQuantity] = useState(1);

  return (
    <div>
      <div className="flex items-center gap-4 mt-4">
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
          max={product?.stock_quantity}
          className="w-16 p-2 border border-gray-300"
        />
        <span>{} Có Sản phẩm</span>
        <button
          className="bg-black text-white px-8 py-3 text-sm active:bg-slate-700"
          onClick={() => handleAddToCart(product.product_id, quantity)}
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default AddToCart;
