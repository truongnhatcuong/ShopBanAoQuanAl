"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const CountCustomer = ({ title }: { title: string }) => {
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
    <div className="md:w-1/4 w-full mb-2 md:mr-0 bg-blue-500/30 l p-6 border-r-4 roun  border-white rounded-xl hover:shadow-xl shadow-md">
      <div className="flex justify-around items-center mb-5">
        <Image
          src={"/image/khachhang.png"}
          width={50}
          height={50}
          alt=""
          className=" w-9 h-8 rounded-full bg-white object-contain "
        />
        <h1 className="text-xl text-center uppercase  family">{title}</h1>
      </div>
      <p className="text-xl text-center text-black border-b-4 border-white w-56">
        {title}: {customerData}
      </p>
    </div>
  );
};

export default CountCustomer;
