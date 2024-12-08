import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { IoTrashBinOutline } from "react-icons/io5";
interface IDeleteSupplier {
  supplier_id: number;
  DeleteHandler: (supplier_id: number) => void;
}
const DeleteSupplier = ({ supplier_id, DeleteHandler }: IDeleteSupplier) => {
  const [showmodal, setShowmodal] = useState(true);

  async function DeleteHandle() {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa danh mục này không?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      const req = await fetch(`/api/supplier/${supplier_id}`, {
        method: "DELETE",
      });
      const data = await req.json();
      console.log(data);
      DeleteHandler(supplier_id);
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Thông báo!",
        text: "Xóa Brand Thành Công",
        icon: "success",
        confirmButtonText: "OK",
      });
      setShowmodal(false);
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
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={DeleteHandle}
      >
        Xóa
      </button>
    </div>
  );
};

export default DeleteSupplier;
