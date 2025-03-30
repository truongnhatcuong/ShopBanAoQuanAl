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
      <h1>Chọn Số Lượng</h1>
      <div className="flex items-center gap-4 mt-4">
        {/* Input để chọn số lượng */}
        <button
          className="border-[1.2px] px-2.5 py-1 border-slate-400 rounded hover:bg-slate-200"
          onClick={handleDecreate}
        >
          -
        </button>
        <div>{quantity}</div>
        <button
          className="border-[1.2px] px-2.5 py-1 border-slate-400 rounded hover:bg-slate-200"
          onClick={handleIncreate}
        >
          +
        </button>

        {/* Button để thêm sản phẩm vào giỏ */}
        <button
          className="bg-black text-white dark:bg-white dark:text-black px-8 py-3 text-sm active:bg-slate-700 family"
          onClick={handleAddToCartClick}
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default AddToCart;
