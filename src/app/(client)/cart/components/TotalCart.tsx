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
    <div className="h-full w-full ">
      <div className="text-xl font-semibold text-gray-900">
        <Title title1="Tổng Tiền" title2="Giỏ Hàng" />
      </div>
      <div className="flex flex-col gap-4 mt-4 text-sm dark:text-white">
        <div className="flex justify-between items-center">
          <p>Thành Tiền:</p>
          <p>{totalPrice.toLocaleString("vi-VN").replace(/\./g, ",")} đ</p>
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
        <div className="flex justify-between items-center font-semibold text-lg mt-2">
          <p>Tổng Tiền:</p>
          <p className={`${totalPrice > 0 ? "text-green-500" : ""}`}>
            {(totalPrice + (totalPrice > 0 ? 25000 : 0))
              .toLocaleString("vi-VN")
              .replace(/\./g, ",")}{" "}
            đ
          </p>
        </div>
      </div>
      <button
        className="dark:bg-white dark:text-black bg-black text-white text-sm py-3 px-8 my-8 w-full sm:w-auto"
        onClick={checkOut}
      >
        THANH TOÁN
      </button>
    </div>
  );
};

export default TotalCart;
