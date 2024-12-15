"use client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
interface IDelete {
  product_id: number;
  reloadData: () => void;
}
const DeleteProduct = ({ product_id, reloadData }: IDelete) => {
  const MySwal = withReactContent(Swal);
  //

  async function hanlerDeleteProduct() {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "Bạn có chắc chắn muốn xóa này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      const res = await fetch(`/api/product/${product_id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const data = await res.json();
        reloadData();
        MySwal.fire({
          title: "Thông báo!",
          text: "Sản phẩm đã được xóa",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        const error = await res.json();
        MySwal.fire({
          title: "Thông báo!",
          text: error.message || "Lỗi Khi Xóa Sản Phẩm",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  }

  return (
    <div>
      <button
        className="p-2 text-white bg-red-500 hover:bg-red-600 rounded text-xl "
        onClick={hanlerDeleteProduct}
      >
        <AiOutlineDelete />
      </button>
    </div>
  );
};

export default DeleteProduct;
