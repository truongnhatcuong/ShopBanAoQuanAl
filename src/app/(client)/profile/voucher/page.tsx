"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Icoupon {
  coupon_id: number;
  coupon_code: string;
  coupon_percentage: string;
  coupon_amount: string;
  usage_limit: string;
  start_date: string;
  end_date: string;
}

const Page = () => {
  const [coupon, setCoupon] = useState<Icoupon[] | []>([]);
  const [copiedCouponId, setCopiedCouponId] = useState<number | null>(null);
  const currentDate = new Date();

  const FetchApi = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coupon`);
    const data = await res.json();
    setCoupon(data.coupon);
  };

  const handleCopy = async (value: string, id: number) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedCouponId(id);
      setTimeout(() => setCopiedCouponId(null), 2000); // Xóa thông báo sau 2 giây
    } catch (err) {
      console.log("error");
    }
  };

  useEffect(() => {
    FetchApi();
  }, []);
  return (
    <div className="container max-w-4xl mx-auto border min-h-screen md:min-h-fit">
      <div className="flex flex-col md:flex-row justify-between mx-4 md:mx-9 mt-4 md:mt-5 border-b-2 pb-3 md:pb-4">
        <p className="text-lg md:text-xl text-center font-semibold text-gray-900 dark:text-white">
          Kho Voucher
        </p>
        <p className="text-red-600 text-xs md:text-sm mt-2 md:mt-0">
          Xem lịch sử voucher <span className="text-gray-600">| Tìm hiểu</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 my-3 md:my-4 mx-4 md:mx-8">
        {coupon.map((item) => (
          <div
            className={`border rounded-lg p-2 md:p-3 shadow-sm hover:shadow-md transition-shadow ${
              currentDate > new Date(item.end_date)
                ? "bg-gray-500/30"
                : "bg-white dark:bg-gray-800"
            }`}
            key={item.coupon_id}
          >
            <div className="flex flex-col space-y-2">
              <div
                className={`text-sm md:text-xl font-semibold ${
                  currentDate > new Date(item.end_date)
                    ? "text-red-500"
                    : "text-blue-600 dark:text-blue-400"
                }`}
              >
                Giảm:{" "}
                {item.coupon_percentage === "0"
                  ? item.coupon_amount
                    ? `${item.coupon_amount} VNĐ`
                    : ""
                  : `${item.coupon_percentage} %`}
              </div>

              <div className="font-mono text-xs md:text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded w-fit text-gray-800 dark:text-gray-200">
                {item.coupon_code}
              </div>

              <div
                className={`text-gray-600 dark:text-gray-400 text-xs md:text-sm ${
                  currentDate > new Date(item.end_date) ? "text-red-500" : ""
                }`}
              >
                HSD:{" "}
                {currentDate > new Date(item.end_date)
                  ? "Hết hạn sử dụng"
                  : new Date(item.end_date).toLocaleString("vi-VN")}
              </div>

              <div className="flex justify-between items-center mt-1 md:mt-2">
                <button
                  onClick={() => handleCopy(item.coupon_code, item.coupon_id)}
                  className={`px-3 md:px-4 py-1 md:py-2 text-sm md:text-base rounded-md transition-colors ${
                    currentDate > new Date(item.end_date)
                      ? "bg-gray-400 cursor-not-allowed text-gray-700"
                      : "bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
                  }`}
                  disabled={currentDate > new Date(item.end_date)}
                >
                  Dùng Ngay
                </button>

                {copiedCouponId === item.coupon_id && (
                  <p className="text-green-500 text-xs md:text-sm">
                    Sao chép thành công
                  </p>
                )}

                <span className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">
                  x{item.usage_limit}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
