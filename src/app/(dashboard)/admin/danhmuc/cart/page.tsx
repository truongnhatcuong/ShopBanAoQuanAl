/* eslint-disable @next/next/no-async-client-component */
"use client";
import React, { useEffect, useState } from "react";

interface ICartAd {
  cart_id: number;
  Customer: { name: string };
  CartItems: {
    quantity: number;
    Product: { price: number; product_name: string };
    Size: { name_size: string };
  }[];
}

const Page = () => {
  const [cart, setCart] = useState<ICartAd[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/cartAd");
      const data = await res.json();
      setCart(data.cartAdmin);
    };
    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 mt-4">
      <table className="min-w-full table-auto text-left text-sm text-gray-500 ">
        <thead className="bg-black text-white">
          <tr>
            <th className="px-4 py-2 font-semibold  border-b"></th>
            <th className="px-4 py-2 font-semibold  border-b">
              TÊN KHÁCH HÀNG
            </th>
            <th className="px-4 py-2 font-semibold  border-b">SẢN PHẨM</th>
            <th className="pl-7 py-2 font-semibold  border-b">GIÁ</th>
            <th className="px-4 py-2 font-semibold  border-b">SỐ LƯỢNG</th>
            <th className="px-4 py-2 font-semibold  border-b">KÍCH THƯỚC</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {cart.map((item, index) =>
            item.CartItems.map((item1, index1) => (
              <tr key={`${index}- ${index1}`} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b text-gray-950">
                  {/* Số thứ tự nếu cần */}
                </td>
                <td className="px-4 py-2 border-b text-gray-950 ">
                  {item.Customer.name}
                </td>
                <td className="px-4 py-2 border-b text-gray-950">
                  {item1.Product.product_name}
                </td>
                <td className="px-4 py-2 border-b text-gray-950">
                  {Number(item1.Product.price)
                    .toLocaleString("vi-VN")
                    .replace(/\./g, ",")}
                  đ
                </td>
                <td className="pl-12 py-2 border-b text-gray-950">
                  {item1.quantity}
                </td>
                <td className="pl-12 py-2 border-b text-gray-950 font-bold ">
                  {item1.Size.name_size}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
