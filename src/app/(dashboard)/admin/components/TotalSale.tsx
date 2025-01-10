"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const TotalSale = () => {
  const [total, setTotal] = useState("");
  const FetchApiTotal = async () => {
    const res = await fetch("/api/admin/thongke");
    const data = await res.json();
    setTotal(data.totalAmount);
  };
  useEffect(() => {
    FetchApiTotal();
  }, []);
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  return (
    <div className="md:w-1/4 w-full mb-2 md:mr-0 bg-blue-200 p-6 border-r-4 border-white">
      <h1 className="text-xl text-center uppercase mb-4 family">
        tổng doanh thu
      </h1>
      <div className="flex justify-around items-center">
        <Image
          src={"/image/danhthu.png"}
          width={50}
          height={50}
          alt=""
          className=" w-9 h-8 object-contain "
        />
        <p className="text-xs text-black">
          Tổng Tiền: {formatCurrency(Number(total))}
        </p>
      </div>
    </div>
  );
};

export default TotalSale;
