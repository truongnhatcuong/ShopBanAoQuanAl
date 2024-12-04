import React, { useContext } from "react";
import Title from "../../components/Title";
import { ShopConText } from "@/app/context/Context";

const TotalCart = () => {
  const { totalPrice } = useContext(ShopConText)!;

  return (
    <div className="w-full bg-white p-6  ">
      <div className="text-xl font-semibold text-gray-900">
        <Title title1="Tổng Tiền" title2="Giỏ Hàng" />
      </div>
      <div className="flex flex-col gap-4 mt-4 text-sm text-gray-600">
        <div className="flex justify-between items-center">
          <p>Thành Tiền:</p>
          <p>{totalPrice.toLocaleString("vi-VN").replace(/\./g, ",")}đ</p>
        </div>

        <hr className="border-gray-300" />
        {/* Phí Giao Hàng */}
        {totalPrice > 0 && (
          <>
            <div className="flex justify-between items-center">
              <p>Phí Giao Hàng:</p>
              <p>25.000 đ</p>
            </div>
            <hr className="border-gray-300" />
          </>
        )}

        {/* Tổng Tiền */}
        <div className="flex justify-between items-center font-semibold text-lg">
          <p>Tổng Tiền:</p>
          <p className={`${totalPrice > 0 ? "text-green-500" : ""}`}>
            {(totalPrice + (totalPrice > 0 ? 25000 : 0))
              .toLocaleString("vi-VN")
              .replace(/\./g, ",")}{" "}
            đ
          </p>
        </div>
      </div>
    </div>
  );
};

export default TotalCart;
