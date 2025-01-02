"use client";
import FinanceChart from "@/app/components/Chart/FinanceChart";
import TinyBarChar from "@/app/components/Chart/TinyBarChar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CountOrder from "./components/CountOrder";
import CountCustomer from "./components/CountCustomer";

const Page = () => {
  return (
    <div className="bg-slate-50">
      {/* tổng quan */}
      <div className="flex flex-col md:flex-row ">
        {/* tổng doanh thu */}
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
            <p className="text-xs text-black">300.000.000đ</p>
          </div>
        </div>
        {/* số đơn đạt hàng*/}
        <CountOrder />
        {/* số khách hàng */}
        <CountCustomer />
        {/* số lượng bán */}
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
            <p className="text-xs text-black">2,364</p>
          </div>
        </div>
      </div>
      {/* biểu đồ */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* tiny chart */}
        <div className="w-full md:w-1/3 my-3">
          <TinyBarChar />
        </div>
        <div className="w-full md:w-2/3 my-3">
          <FinanceChart />
        </div>
      </div>
    </div>
  );
};

export default Page;
