"use client";
import React, { useEffect, useState } from "react";
import TableCoupon from "./components/TableCoupon";
import AddCoupon from "./components/AddCoupon";

const Page = () => {
  const FetchApi = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coupon`, {
      cache: "force-cache",
      next: { revalidate: 800 }, // Cập nhật cache mỗi 1 giờ
    });
    const data = await res.json();
    setCoupon(data.coupon);
  };
  const [coupon, setCoupon] = useState([]);
  useEffect(() => {
    FetchApi();
  }, []);
  return (
    <>
      <div className="flex justify-end mr-6 my-2">
        <AddCoupon reloadData={FetchApi} />
      </div>
      <TableCoupon coupon={coupon} reloadData={FetchApi} />
    </>
  );
};

export default Page;
