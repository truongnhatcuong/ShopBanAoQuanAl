/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
interface IProduct {
  product_id: number;
  stock_quantity: number;
}

interface IProps {
  product: IProduct;
}

const AddToCart = ({ product }: IProps) => {
  const MySwal = withReactContent(Swal);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    // Gửi request API thêm vào giỏ hàng
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: product.product_id,
        quantity,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      MySwal.fire({
        position: "center",
        icon: "success",
        title: "đã thêm vào giỏ hàng",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mt-4">
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
          max={product.stock_quantity}
          className="w-16 p-2 border border-gray-300"
        />
        <button
          onClick={handleAddToCart}
          className="bg-black text-white px-8 py-3 text-sm active:bg-slate-700"
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default AddToCart;
