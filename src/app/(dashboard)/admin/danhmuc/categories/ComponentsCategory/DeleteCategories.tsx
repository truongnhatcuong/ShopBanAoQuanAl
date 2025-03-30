import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface IDelete {
  category_id: number;
  reloadData: () => void;
}

const DeleteCategories = ({ category_id, reloadData }: IDelete) => {
  const MySwal = withReactContent(Swal);

  const handleDelete = async () => {
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
      try {
        const res = await fetch(`/api/categories/${category_id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          await res.json();
          reloadData();
          MySwal.fire({
            title: "Thông báo!",
            text: "Xóa Danh Mục Thành Công",
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
          const error = await res.json();
          MySwal.fire({
            title: "Thông báo!",
            text: error.message || "Xóa Danh Mục Thất Bại",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } catch (error: any) {
        MySwal.fire({
          title: "Thông báo!",
          text: error.message,
          icon: "success",
          confirmButtonText: "OK",
        });
        return;
      }
    }
  };

  return (
    <button
      className="p-2 text-white bg-red-500 hover:bg-red-600 rounded text-xl "
      onClick={handleDelete}
    >
      <AiOutlineDelete />
    </button>
  );
};

export default DeleteCategories;
