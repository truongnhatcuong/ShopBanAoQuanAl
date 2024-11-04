import React, { useState } from "react";
import { IoTrashBinOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface IDelete {
  category_id: number;
  deleteCategories: (categories_id: number) => void;
}

const DeleteCategories = ({ category_id, deleteCategories }: IDelete) => {
  const MySwal = withReactContent(Swal);
  const [show, setShow] = useState(false);
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
          deleteCategories(category_id);

          MySwal.fire({
            title: "Thông báo!",
            text: "Xóa sản Phẩm Thành Công",
            icon: "success",
            confirmButtonText: "OK",
          });
          setShow(false);
        }
      } catch (error) {
        toast.error("error deleting category", {
          position: "top-right",
          autoClose: 5000,
        });
        return;
      }
    }
  };

  return (
    <button
      className="text-red-500 hover:text-red-700 text-2xl"
      onClick={handleDelete}
    >
      <IoTrashBinOutline />
    </button>
  );
};

export default DeleteCategories;
