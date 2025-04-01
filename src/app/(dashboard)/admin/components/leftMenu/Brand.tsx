"use client";
import { ShopConText } from "@/app/context/Context";
import Image from "next/image";
import React, { useContext } from "react";

const Brand = () => {
  const { isLeftMenuVisible } = useContext(ShopConText)!;

  return (
    <div className="container mx-auto px-4">
      <div
        className={`flex items-center justify-center gap-3 transition-all duration-300 ${
          isLeftMenuVisible ? "mt-2" : "mt-2"
        }`}
      >
        <div className="flex-shrink-0">
          <Image
            src="/Image/logo.png"
            alt="OrdinClub Logo"
            width={100}
            height={100}
            className={`border-2 border-gray-200 bg-white object-contain rounded-full shadow-sm  w-12 h-12 hover:scale-105 transition-transform duration-200`}
            priority
          />
        </div>
        <div className={`${isLeftMenuVisible ? "block" : "hidden"}`}>
          <p
            className="text-2xl uppercase font-semibold text-white
            tracking-tight mb-0 hover:text-blue-600 
            transition-colors duration-200"
          >
            Ordin Club
          </p>
        </div>
      </div>
    </div>
  );
};

export default Brand;
