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
    <div className="containermax-w-7xl border h-screen">
      <div className="flex justify-between mx-9 mt-5 border-b-2 pb-4">
        <p className="text-xl text-center font-semibold "> Kho VouCher</p>
        <p className="text-red-600 text-sm">
          Xem lịch sử voucher <span className="text-gray-600">| Tìm hiểu</span>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 mx-8">
        {coupon.map((item) => (
          <div
            className={`border rounded-lg p-1 md:p-3  shadow-sm hover:shadow-md transition-shadow ${
              currentDate > new Date(item.end_date)
                ? "bg-gray-500/30"
                : "bg-white"
            }`}
            key={item.coupon_id}
          >
            <div className="flex flex-col space-y-2">
              <div
                className={`md:text-xl text-base font-semibold ${
                  currentDate > new Date(item.end_date)
                    ? "text-red-500"
                    : "text-blue-600"
                }`}
              >
                giảm :{" "}
                {item.coupon_percentage === "0"
                  ? item.coupon_amount
                    ? `${item.coupon_amount} VNĐ`
                    : ""
                  : `${item.coupon_percentage} %`}
              </div>

              <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded w-fit">
                {item.coupon_code}
              </div>

              <div
                className={`text-gray-600 text-sm ${
                  currentDate > new Date(item.end_date) ? "text-red-500" : ""
                }`}
              >
                HSD:{" "}
                {currentDate > new Date(item.end_date)
                  ? "hết hạn sử dụng"
                  : new Date(item.end_date).toLocaleString("vi-VN")}
              </div>

              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() => handleCopy(item.coupon_code, item.coupon_id)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    currentDate > new Date(item.end_date)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                  disabled={currentDate > new Date(item.end_date)} // Vô hiệu hóa nút nếu hết hạn
                >
                  Dùng Ngay
                </button>

                {copiedCouponId === item.coupon_id && (
                  <p className="text-green-500 text-sm mt-2">
                    Sao chép thành công
                  </p>
                )}

                <span className="text-gray-500">x{item.usage_limit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
