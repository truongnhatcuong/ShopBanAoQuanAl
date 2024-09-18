"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
interface IDelete {
  brand_id: number;
  DeleteHandler(brand_id: number): void;
}
const DeleteBrand = ({ brand_id, DeleteHandler }: IDelete) => {
  const [show, setShow] = useState(false);
  const DeleteHander = async () => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa danh mục này không?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      const reponse = await fetch(`/api/brand/${brand_id}`, {
        method: "DELETE",
      });
      const data = await reponse.json();
      console.log("deleted success :", data);
      DeleteHandler(brand_id);
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Thông báo!",
        text: "Xóa Brand Thành Công",
        icon: "success",
        confirmButtonText: "OK",
      });
      setShow(false);
    } catch (error: any) {
      console.log(error);
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Thông báo!",
        text: "Lỗi Khi Xóa Brand",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <div>
      <button
        className="bg-red-500 p-2 rounded-lg hover:bg-red-600 text-white font-bold"
        onClick={DeleteHander}
      >
        DELETE
      </button>
    </div>
  );
};

export default DeleteBrand;
