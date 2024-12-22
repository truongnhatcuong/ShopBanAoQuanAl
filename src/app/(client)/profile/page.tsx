"use client";
import React, { useEffect, useState } from "react";

interface ICustomer {
  customer_id: number;
  name: string;
  email: string;
  phone: number | string;
  address: string;
  username: string;
}

const Profile = () => {
  const [user, setUser] = useState<ICustomer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Thêm state để quản lý lỗi

  const [token, setToken] = useState<string | null>(null);

  // Lấy token từ localStorage khi component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = window.localStorage.getItem("token");
      setToken(accessToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      async function getApiCustomer() {
        try {
          const res = await fetch("/api/auth/user/profile", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Gửi token qua Header
            },
          });

          if (res.ok) {
            const data = await res.json();
            setUser(data.user);
            setLoading(false);
          } else {
            const dataError = await res.json();
            setError(dataError.message || "Lỗi khi tải thông tin.");
            setLoading(false);
          }
        } catch (error) {
          setError("Có lỗi xảy ra khi kết nối đến server.");
          setLoading(false);
        }
      }
      getApiCustomer();
    }
  }, [token]);

  if (loading) {
    return <div>Đang tải thông tin...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>; // Hiển thị thông báo lỗi nếu có
  }

  return (
    <div className="container mx-auto my-8 border border-gray-900 shadow-lg max-w-6xl w-full h-[500px] rounded-xl bg-stone-100 dark:bg-gray-800 dark:border-white opacity-90">
      <div className="w-full bg-black py-4 rounded-t-lg">
        <h2 className="text-center text-2xl text-white font-semibold">
          Thông Tin Khách Hàng
        </h2>
      </div>
      <div className="rounded-b-lg p-6 mt-12 dark:bg-gray-900 dark:text-white">
        {user && (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <li className="py-5 px-3 border-b border-gray-300 dark:border-gray-600">
              <label className="font-medium text-lg text-gray-950 dark:text-gray-300 block">
                Tên đăng nhập:
              </label>
              <span className="text-black dark:text-white text-xl pt-2">
                {user.username}
              </span>
            </li>
            <li className="py-5 px-3 border-b border-gray-300 dark:border-gray-600">
              <label className="font-medium text-lg text-gray-950 dark:text-gray-300 block">
                Địa Chỉ:
              </label>
              <span className="text-black dark:text-white text-xl pt-2">
                {user.address}
              </span>
            </li>
            <li className="py-5 px-3 border-b border-gray-300 dark:border-gray-600">
              <label className="font-medium text-lg text-gray-950 dark:text-gray-300 block">
                Tên đầy đủ:
              </label>
              <span className="text-black dark:text-white text-xl pt-2">
                {user.name}
              </span>
            </li>
            <li className="py-5 px-3 border-b border-gray-300 dark:border-gray-600">
              <label className="font-medium text-lg text-gray-950 dark:text-gray-300 block">
                Số điện thoại:
              </label>
              <span className="text-black dark:text-white text-xl pt-2">
                {user.phone}
              </span>
            </li>
            <li className="py-5 px-3 border-b border-gray-300 dark:border-gray-600">
              <label className="font-medium text-lg text-gray-950 dark:text-gray-300 block">
                Email:
              </label>
              <span className="text-black dark:text-white text-xl pt-2">
                {user.email}
              </span>
            </li>
            <li className="py-5 px-7 border-b border-gray-300 dark:border-gray-600">
              <label className="font-medium text-lg text-gray-950 dark:text-gray-300 block">
                Giới tính:
              </label>
              <span className="text-black dark:text-white text-xl pt-2">
                Nam
              </span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
