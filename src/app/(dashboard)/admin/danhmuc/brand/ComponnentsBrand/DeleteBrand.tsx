"use client";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
interface IDelete {
  brand_id: number;
  DeleteHandler(brand_id: number): void;
}
const DeleteBrand = ({ brand_id, DeleteHandler }: IDelete) => {
  const [show, setShow] = useState(false);
  const MySwal = withReactContent(Swal);
  const DeleteHander = async () => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "Bạn có chắc chắn muốn xóa này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    try {
      if (result.isConfirmed) {
        const reponse = await fetch(`/api/brand/${brand_id}`, {
          method: "DELETE",
        });
        if (reponse.ok) {
          const data = await reponse.json();
          DeleteHandler(brand_id);

          MySwal.fire({
            title: "Thông báo!",
            text: "Xóa Thương Hiệu Thành Công",
            icon: "success",
            confirmButtonText: "OK",
          });
          setShow(false);
        } else {
          const error = await reponse.json();
          MySwal.fire({
            title: "Thông báo!",
            text: error.message || "Xóa Thương Hiệu Thất Bại",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    } catch (error: any) {
      MySwal.fire({
        title: "Thông báo!",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <div>
      <button
        className="p-2 text-white bg-red-500 hover:bg-red-600 rounded text-xl "
        onClick={DeleteHander}
      >
        <AiOutlineDelete />
      </button>
    </div>
  );
};

export default DeleteBrand;
