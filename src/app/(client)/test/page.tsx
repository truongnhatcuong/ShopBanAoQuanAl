/* eslint-disable @next/next/no-img-element */
"use client";
import { getCookie } from "@/utils/cookies";
import Image from "next/image";
import { useState } from "react";

export default function ProductDisplay() {
  const token = getCookie("token");
  console.log(token);

  const [showButtons, setShowButtons] = useState(false);

  const handleMouseEnter = () => {
    setShowButtons(true);
  };

  const handleMouseLeave = () => {
    setShowButtons(false);
  };
  const productName = "Quần Jogger Nam Tron QJ-005";
  const productPrice = 390000;
  const productImageUrl =
    "https://pos.nvncdn.com/556e88-134541/ps/20221017_VF2cwszNJEt9yAIzEywCbdzY.jpg";

  return (
    <div
      className="relative w-64 rounded-lg shadow-md overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={productImageUrl}
        alt={productName}
        width={256}
        height={256}
        className="w-full h-auto"
      />
      <div className="p-4">
        <h2 className=" font-bold">{productName}</h2>
        <p className="text-gray-700 text-base">Giá: {token}</p>
      </div>
      {showButtons && (
        <div className="absolute inset-0  bg-slate-50 bg-opacity-30 flex items-end justify-center ">
          <button className="bg-opacity-80 bg-black text-white text-sm py-2 px-2  w-1/2 border-r-2 border-white">
            thêm giỏ hàng
          </button>
          <button className="bg-opacity-80 bg-black  text-white  text-sm py-2 px-2  w-1/2">
            Xem chi tiết
          </button>
        </div>
      )}
    </div>
  );
}
