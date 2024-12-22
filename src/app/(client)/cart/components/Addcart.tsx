"use client";
import { ShopConText } from "@/app/context/Context";
import React, { useContext, useState } from "react";

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

  // Kiểm tra kích thước có được chọn hay không khi người dùng nhấn nút "Thêm vào giỏ"
  const handleAddToCartClick = () => {
    if (selectedSizeId !== null) {
      handleAddToCart(product.product_id, quantity, selectedSizeId); // Gọi hàm từ context để thêm vào giỏ
    } else {
      alert("Vui lòng chọn kích thước"); // Thông báo nếu chưa chọn kích thước
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mt-4">
        {/* Input để chọn số lượng */}
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
          max={product?.stock_quantity}
          disabled={product?.stock_quantity === 0} // Disable khi hết hàng
          className="w-16 p-2 border border-gray-300"
        />
        {/* hiển thị số lượng còn lại của size */}
        {stockQuantity > 0 && (
          <p className="text-sm font-sans">còn {stockQuantity} sản phẩm</p>
        )}

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
