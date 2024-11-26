/* eslint-disable @next/next/no-img-element */
import { assets } from "@/app/assets/frontend_assets/assets";
import Link from "next/link";
import { it } from "node:test";
import React from "react";
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

interface CartItemListProps {
  items: CartItem[];
}
const ItemCart = ({ items }: CartItemListProps) => {
  return (
    <div className="py-4   text-gray-700 ">
      {items.map((item) => (
        <div
          key={item.cartitem_id}
          className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.product.Images[0].image_url}
              alt=""
              className="w-16 sm:w-20"
            />
            <Link href={`/product/${item.product_id}`}>
              <div>
                <p className="text-sm sm:text-lg font-medium">
                  {item.product.product_name}
                </p>
                <div className="flex items-center gap-5 mt-2 ">
                  <p>{item.product.price}vnđ</p>
                  <p className="px-2 sm:px-3 sm:py-1 border border-gray-50 text-gray-700 bg-slate-50">
                    L
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Quantity Input */}
          <div className="flex justify-start items-center ">
            <input
              className="max-w-10 sm:max-w-20 border px-2 py-1 text-center"
              type="number"
              min={1}
              defaultValue={item.quantity}
            />
          </div>
          {/* Bin Icon */}
          <div className="flex justify-end mr-4">
            <img
              src={assets.bin_icon.src}
              className="w-4 sm:w-5 cursor-pointer"
              alt="Delete Icon"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemCart;
