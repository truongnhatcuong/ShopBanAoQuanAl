import React, { useState } from "react";
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
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleDelete}
    >
      Xóa
    </button>
  );
};

export default DeleteCategories;
