"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const TotalSale = ({ title }: { title: string }) => {
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
    <div className="md:w-1/4 w-full mb-2 md:mr-0 bg-blue-200 p-6 border-r-4 border-white hover:shadow-xl shadow-md rounded-xl">
      <div className="flex justify-around items-center">
        <Image
          src={"/image/danhthu.png"}
          width={50}
          height={50}
          alt=""
          className=" w-9 h-8 object-contain "
        />
        <h1 className="text-xl text-center uppercase  family">{title}</h1>
      </div>
      <p className="text-lg mt-5 text-black border-b-4 border-white">
        Tổng Tiền: {formatCurrency(Number(total))}
      </p>
    </div>
  );
};

export default TotalSale;
