import React, { useState } from "react";
import { IoTrashBinOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface IDelete {
  product_id: number;
  DeleteHandle: (product_id: number) => void;
}
const DeleteProduct = ({ product_id, DeleteHandle }: IDelete) => {
  const [showdelete, setshowdelete] = useState(false);

  async function DeleteHandleApi() {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa danh mục này không?"
    );
    if (!confirmDelete) {
      return;
    }

    ////
    const res = await fetch(`/api/product/${product_id}`, { method: "DELETE" });

    ////
    if (res.ok) {
      const data = await res.json();
      console.log("xóa id :", data);
      setshowdelete(false);
      DeleteHandle(product_id);
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Thông báo!",
        text: "Xóa sản phẩm Thành Công",
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Thông báo!",
        text: "Lỗi Khi Xóa sản phẩm",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }
  return (
    <div>
      <button
        className="text-red-500 p-1 rounded-md text:bg-red-600  text-2xl"
        onClick={DeleteHandleApi}
      >
        <IoTrashBinOutline />
      </button>
    </div>
  );
};

export default DeleteProduct;
