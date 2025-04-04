/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ShopConText } from "@/app/context/Context";
import { trackUserAction } from "@/lib/trackUserAction";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

interface IProduct {
  product_id: number;
  stock_quantity: number;
  sizes: { size_id: number; name_size: string }[]; // Mảng các kích thước sản phẩm
}

interface IProps {
  product: IProduct;
  selectedSizeId: number | null; // Truyền selectedSizeId từ bên ngoài vào
  stockQuantity: number;
}

const AddToCart = ({ product, selectedSizeId, stockQuantity }: IProps) => {
  const { handleAddToCart } = useContext(ShopConText)!; // Lấy hàm handleAddToCart từ context
  const [quantity, setQuantity] = useState(1); // Trạng thái lưu số lượng sản phẩm

  const handleIncreate = () => {
    if (quantity === stockQuantity) {
      MySwal.fire({
        title: "Thông báo",
        text: `Chỉ còn lại ${stockQuantity} sản phẩm`,
        icon: "warning",
        confirmButtonText: "Đã hiểu",
      });
      return;
    }
    setQuantity((prev) => prev + 1);
  };

  const handleDecreate = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  };

  // Kiểm tra kích thước có được chọn hay không khi người dùng nhấn nút "Thêm vào giỏ"
  const handleAddToCartClick = () => {
    if (selectedSizeId !== null) {
      handleAddToCart(product.product_id, quantity, selectedSizeId);
      trackUserAction(product.product_id, "add_to_cart");
    } else {
      MySwal.fire({
        title: "Chưa chọn kích thước",
        text: "Vui lòng chọn kích thước trước khi thêm vào giỏ hàng",
        icon: "warning",
        confirmButtonText: "Chọn ngay",
      });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
        Chọn Số Lượng
      </h1>
      <div className="flex items-center gap-2 mt-6">
        {/* Input để chọn số lượng */}
        <button
          className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 hover:border-gray-400 active:bg-gray-200 transition-all duration-200"
          onClick={handleDecreate}
          aria-label="Giảm số lượng"
        >
          <span className="text-xl font-medium">-</span>
        </button>
        <div className="w-12 text-center text-lg font-medium text-gray-900 dark:text-gray-100">
          {quantity}
        </div>
        <button
          className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 hover:border-gray-400 active:bg-gray-200 transition-all duration-200"
          onClick={handleIncreate}
          aria-label="Tăng số lượng"
        >
          <span className="text-xl font-medium">+</span>
        </button>

        {/* Button để thêm sản phẩm vào giỏ */}
        <button
          className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-8 py-3 rounded-lg text-sm font-medium shadow-md hover:from-indigo-700 hover:to-blue-600 active:from-indigo-800 active:to-blue-700 transition-all duration-300 dark:from-gray-100 dark:to-gray-200 dark:text-gray-900 dark:hover:from-gray-200 dark:hover:to-gray-300"
          onClick={handleAddToCartClick}
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default AddToCart;
