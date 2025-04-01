import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AiOutlineDelete } from "react-icons/ai";
interface IDeleteSupplier {
  supplier_id: number;
  DeleteHandler: (supplier_id: number) => void;
}
const DeleteSupplier = ({ supplier_id, DeleteHandler }: IDeleteSupplier) => {
  const [showmodal, setShowmodal] = useState(true);
  const MySwal = withReactContent(Swal);
  async function DeleteHandle() {
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
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/supplier/${supplier_id}`,
          {
            method: "DELETE",
          }
        );
        //
        if (res.ok) {
          const data = await res.json();

          DeleteHandler(supplier_id);
          MySwal.fire({
            title: "Thông báo!",
            text: "Xóa Nhà Cung Cấp Thành Công",
            icon: "success",
            confirmButtonText: "OK",
          });
          setShowmodal(false);
        } else {
          const error = await res.json();
          MySwal.fire({
            title: "Thông báo!",
            text: error.message || "Xóa Nhà Cung Cấp Thất Bại",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    } catch (error: any) {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Thông báo!",
        text: "Lỗi Khi Xóa Brand",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }
  return (
    <div>
      <button
        className="p-2 text-white bg-red-500 hover:bg-red-600 rounded text-xl "
        onClick={DeleteHandle}
      >
        <AiOutlineDelete />
      </button>
    </div>
  );
};

export default DeleteSupplier;
