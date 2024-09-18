import { METHODS } from "http";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface IDelete {
  category_id: number;
  deleteCategories: (categories_id: number) => void;
}

const DeleteCategories = ({ category_id, deleteCategories }: IDelete) => {
  const [show, setShow] = useState(false);
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa danh mục này không?"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`/api/categories/${category_id}`, {
        method: "DELETE",
      });
      await response.json();
      deleteCategories(category_id);
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Thông báo!",
        text: "Xóa sản Phẩm Thành Công",
        icon: "success",
        confirmButtonText: "OK",
      });
      setShow(false);
    } catch (error) {
      toast.error("error deleting category", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-700 rounded-md p-3 text-white font-medium cursor-pointer"
      onClick={handleDelete}
    >
      Delete
    </button>
  );
};

export default DeleteCategories;
