"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const CountCustomer = () => {
  const [customerData, setCustomerData] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/admin/thongke");
      const data = await response.json();

      setCustomerData(data.customerCount);
    };

    fetchData();
  }, []);
  return (
    <div className="md:w-1/4 w-full mb-2 md:mr-0 bg-blue-200 p-6 border-r-4 border-white">
      <h1 className="text-xl text-center uppercase mb-4 family">
        Số Khách Hàng
      </h1>
      <div className="flex justify-around items-center">
        <Image
          src={"/image/khachhang.png"}
          width={50}
          height={50}
          alt=""
          className=" w-9 h-8 rounded-full bg-white object-contain "
        />
        <p className="text-xs text-black">Thành Viên: {customerData}</p>
      </div>
    </div>
  );
};

export default CountCustomer;
