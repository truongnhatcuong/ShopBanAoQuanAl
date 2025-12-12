"use client";
import React, { Suspense, useEffect } from "react";
import Link from "next/link";
import { Factory } from "lucide-react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const CancelPage = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const orderCode = searchParams.get("orderCode");
  useEffect(() => {
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/payos`, {
      status,
      orderCode,
    });
  }, []);

  return (
    <div className=" mt-7 flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-red-100 p-3">
              <Factory className="text-red-500 text-4xl" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Đặt phòng thất bại!
          </h2>
          <p className="text-gray-600 mb-6">
            Rất tiếc, đã có lỗi xảy ra trong quá trình đặt phòng. Vui lòng thử
            lại sau hoặc liên hệ với chúng tôi để được hỗ trợ.
          </p>
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              Trở về trang chủ
            </Link>
            <Link
              href="/contact"
              className="block w-full border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-50 transition-colors"
            >
              Liên hệ hỗ trợ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const page = () => {
  return (
    <Suspense>
      <CancelPage />
    </Suspense>
  );
};

export default page;
