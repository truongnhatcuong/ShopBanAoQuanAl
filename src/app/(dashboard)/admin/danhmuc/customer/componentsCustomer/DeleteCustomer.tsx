import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
interface IDelete {
  customer_id: number;
  reloadData: () => void;
}
const DeleteCustomer = (props: IDelete) => {
  const MySwal = withReactContent(Swal);

  async function DeleteHandle(e: React.MouseEvent) {
    e.preventDefault();

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
      const res = await fetch(`/api/customer/${props.customer_id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        const data = await res.json();
        props.reloadData();
        MySwal.fire({
          position: "center",
          icon: "success",
          title: "Đã Xoá Thành Công",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const dataError = await res.json();
        console.log(dataError);
        MySwal.fire({
          position: "center",
          icon: "error",
          title: dataError.message || "Lỗi Khi Xoá Khách Hàng",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  }

  return (
    <div
      className="p-2 text-white bg-red-500 hover:bg-red-600 rounded text-xl w-9 "
      onClick={DeleteHandle}
    >
      <AiOutlineDelete />
    </div>
  );
};

export default DeleteCustomer;
