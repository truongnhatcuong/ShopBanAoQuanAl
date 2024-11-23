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
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);

  const handleMouseEnter = (productId: number) => {
    setHoveredProductId(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  return (
    <div className=" mx-auto px-4 ml-6 text-gray-700 cursor-pointer ">
      <div className="flex  flex-col  sm:flex-row  gap-7 overflow-hidden">
        {ProductValue.map((item) => (
          <div
            key={item.product_id}
            className="relative w-72   overflow-hidden transform transition-transform duration-300 hover:scale-105  "
            onMouseEnter={() => handleMouseEnter(item.product_id)}
            onMouseLeave={handleMouseLeave}
          >
            {item.Images && item.Images.length > 0 ? (
              <img
                src={item.Images[0].image_url}
                alt={item.product_name}
                className="w-full h-72 object-fill transition ease-in-out"
              />
            ) : (
              <p>Không có hình ảnh</p>
            )}

            <div className="p-5 ml-2">
              <h2 className=" pt-3 pb-1 text-sm  uppercase">
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

            {hoveredProductId === item.product_id && (
              <div className="absolute inset-0 bg-white bg-opacity-15 flex items-end justify-center">
                <button className="bg-opacity-80 bg-black text-white text-sm py-2 px-2 w-1/2 border-r-2 border-white hover:text-gray-300">
                  thêm giỏ hàng
                </button>

                <button className="bg-opacity-80 bg-black text-white text-sm py-2 px-2 w-1/2 hover:text-gray-300">
                  <Link href={`/product/${item.product_id}`}>Xem chi tiết</Link>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
