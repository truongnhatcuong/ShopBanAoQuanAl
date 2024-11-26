/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Link from "next/link";

interface IProduct {
  product_id: number;
  product_name: string;
  description: string;
  price: string;
  stock_quantity: number;
  Images: { image_url: string }[];
  color: string;
}

interface ProductListProps {
  ProductValue: IProduct[];
}

const ProductCard = ({ ProductValue }: ProductListProps) => {
  return (
    <div className=" mx-auto px-4 ml-6 text-gray-700 cursor-pointer ">
      <div className="flex  flex-col  sm:flex-row  gap-8 overflow-hidden ">
        {ProductValue.map((item) => (
          <Link key={item.product_id} href={`/product/${item.product_id}`}>
            <div className="relative w-60  overflow-hidden transform transition-transform duration-300 hover:scale-105  ">
              <img
                src={item.Images[0].image_url}
                alt={item.product_name}
                className="w-full h-60 object-fill transition ease-in-out"
              />

              <div className="p-5 ml-2">
                <h2 className=" pt-3 pb-1 text-sm uppercase">
                  {item.product_name}
                </h2>
                <p className="  text-gray-800  ">
                  <span className="font-medium ">
                    {parseInt(item.price)
                      .toLocaleString("vi-VN")
                      .replace(/\./g, ",")}
                  </span>
                  <span className="border-b-2 border-black font-medium">đ</span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
