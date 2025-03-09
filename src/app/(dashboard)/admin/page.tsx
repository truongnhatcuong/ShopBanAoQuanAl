"use client";
import FinanceChart from "@/app/components/Chart/FinanceChart";
import TinyBarChar from "@/app/components/Chart/TinyBarChar";
import CountOrder from "./components/CountOrder";
import CountCustomer from "./components/CountCustomer";
import Earth from "./components/EarthForm";
import Title from "@/app/(client)/components/Title";
import Link from "next/link";
import TotalSale from "./components/TotalSale";
import TotalQuantity from "./components/TotalQuantity";

const Page = () => {
  return (
    <div className="bg-slate-50 ">
      {/* tổng quan */}
      <div className="text-center mt-3 mb-5">
        {" "}
        <Title title1="Thống Kê" title2="Doanh Thu" />
      </div>
      <div className="flex gap-2">
        {/* tổng doanh thu */}
        <TotalSale title="Tổng Doanh Thu" />
        {/* số đơn đạt hàng*/}
        <CountOrder title="Đơn Đặt Hàng" />
        {/* số khách hàng */}
        <CountCustomer title="Khách Hàng" />
        {/* số lượng bán */}
        <TotalQuantity title="Tổng Lượt Bán" />
      </div>
      {/* biểu đồ */}
      <div>
        <div className="text-center my-7">
          {" "}
          <Title title1="Biểu Đồ" title2="Thống Kê" />
        </div>
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
    </div>
  );
};

export default Page;
