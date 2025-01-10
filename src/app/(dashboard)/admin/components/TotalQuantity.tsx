"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const TotalQuantity = () => {
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
    <div className="md:w-1/4 w-full mb-2 md:mr-0 bg-yellow-100 p-6 border-r-4 border-white">
      <h1 className="text-xl text-center uppercase mb-4 family">
        Số Lượng Bán
      </h1>
      <div className="flex justify-around items-center">
        <Image
          src={"/image/soluongban.png"}
          width={50}
          height={50}
          alt=""
          className=" w-9 h-8 object-contain "
        />
        <p className="text-xs text-black">Số lượt Bán: {total}</p>
      </div>
    </div>
  );
};

export default TotalQuantity;
