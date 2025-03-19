/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ShopConText } from "@/app/context/Context";
import { trackUserAction } from "@/lib/trackUserAction";
import React, { useContext, useEffect, useState } from "react";

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
  const { handleAddToCart, user } = useContext(ShopConText)!; // Lấy hàm handleAddToCart từ context
  const [userId, setUserId] = useState<any>(null);
  const [quantity, setQuantity] = useState(1); // Trạng thái lưu số lượng sản phẩm

  const handleIncreate = () => {
    if (quantity === stockQuantity) {
      alert(`chỉ còn lại ${stockQuantity} số lượng`);
      return;
    }
    setQuantity((prev) => prev + 1);
  };

  const handleDecreate = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  };
  useEffect(() => {
    if (user.customer_id) {
      setUserId(user.customer_id);
    }
  }, [user.customer_id]); // Chỉ theo dõi `user.customer_id`, tránh vòng lặp vô hạn

  // Kiểm tra kích thước có được chọn hay không khi người dùng nhấn nút "Thêm vào giỏ"
  const handleAddToCartClick = () => {
    if (!userId) {
      alert("Vui lòng đăng nhập trước khi thêm vào giỏ hàng");
      return;
    }

    if (selectedSizeId !== null) {
      handleAddToCart(product.product_id, quantity, selectedSizeId);
      trackUserAction(userId, product.product_id, "add_to_cart");
    } else {
      alert("Vui lòng chọn kích thước");
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
