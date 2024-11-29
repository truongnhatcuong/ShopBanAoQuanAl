"use client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import React from "react";
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
        await res.json();
        MySwal.fire({
          title: "Thông báo!",
          text: "Xóa sản phẩm không thành công",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  }
  return (
    <div>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={hanlerDeleteProduct}
      >
        Xóa
      </button>
    </div>
  );
};

export default DeleteProduct;
