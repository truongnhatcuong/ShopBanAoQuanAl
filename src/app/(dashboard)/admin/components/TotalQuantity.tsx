"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const TotalQuantity = ({ title }: { title: string }) => {
  const [total, setTotal] = useState(0);
  const FetchApiTotal = async () => {
    const res = await fetch("/api/admin/thongke");
    const data = await res.json();
    setTotal(data.totalQuantily);
  };
  useEffect(() => {
    FetchApiTotal();
  }, []);
  return (
    <div className="md:w-1/4 w-full mb-2 md:mr-0 bg-yellow-500/20 hover:shadow-xl shadow-md  p-6 border-r-4 border-white rounded-xl">
      <div className="flex justify-around items-center">
        <Image
          src={"/image/soluongban.png"}
          width={50}
          height={50}
          alt=""
          className=" w-9 h-8 object-contain "
        />
        <h1 className="text-xl text-center uppercase family">{title}</h1>
      </div>
      <p className="text-xl text-center mt-5 text-black  border-b-4 border-blue-500">
        Số lượt Bán: {total}
      </p>
    </div>
  );
};

export default TotalQuantity;
