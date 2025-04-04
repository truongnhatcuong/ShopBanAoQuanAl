import React, { useContext } from "react";
import Title from "../../components/Title";
import { ShopConText } from "@/app/context/Context";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const TotalCart = () => {
  const { totalPrice } = useContext(ShopConText)!;
  const router = useRouter();
  function checkOut() {
    if (totalPrice > 0) {
      router.push("/placeOrder");
    } else {
      toast.error("ít nhất một sản phẩm !");
    }
  }
  return (
    <div className="h-full w-full p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {/* Tiêu đề */}
      <div className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
        <Title title1="Tổng Tiền" title2="Giỏ Hàng" />
      </div>

      {/* Thông tin giỏ hàng */}
      <div className="flex flex-col gap-4 sm:gap-5 text-sm sm:text-base dark:text-gray-200">
        {/* Thành Tiền */}
        <div className="flex justify-between items-center">
          <p className="text-gray-700 dark:text-gray-300">Thành Tiền:</p>
          <p className="font-medium">
            {totalPrice.toLocaleString("vi-VN").replace(/\./g, ",")} đ
          </p>
        </div>

        <hr className="border-gray-300 dark:border-gray-600" />

        {/* Phí Giao Hàng */}
        {totalPrice > 0 && (
          <>
            <div className="flex justify-between items-center">
              <p className="text-gray-700 dark:text-gray-300">Phí Giao Hàng:</p>
              <p className="font-medium">25.000 đ</p>
            </div>
            <hr className="border-gray-300 dark:border-gray-600" />
          </>
        )}

        {/* Tổng Tiền */}
        <div className="flex justify-between items-center font-semibold text-lg sm:text-xl mt-2 sm:mt-3">
          <p className="text-gray-900 dark:text-white">Tổng Tiền:</p>
          <p
            className={`${
              totalPrice > 0
                ? "text-green-600 dark:text-green-400"
                : "text-gray-500"
            }`}
          >
            {(totalPrice + (totalPrice > 0 ? 25000 : 0))
              .toLocaleString("vi-VN")
              .replace(/\./g, ",")}{" "}
            đ
          </p>
        </div>
      </div>

      {/* Nút Thanh Toán */}
      <button
        className="mt-6 sm:mt-8 w-full sm:w-auto bg-black dark:bg-white text-white dark:text-black text-sm sm:text-base font-medium py-3 px-6 sm:px-8 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
        onClick={checkOut}
      >
        THANH TOÁN
      </button>
    </div>
  );
};

export default TotalCart;
