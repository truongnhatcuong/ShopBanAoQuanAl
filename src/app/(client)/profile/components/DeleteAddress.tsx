import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface IDefault {
  address_id: number;
  reloadData: () => void;
}

const DeleteAddress = ({ address_id, reloadData }: IDefault) => {
  const MySwal = withReactContent(Swal);

  const handlerDelete = async () => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "Bạn có chắc chắn muốn xóa này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    // xác nhận muốn xóa hay không
    if (result.isConfirmed) {
      const res = await fetch(`/api/addressShiper/${address_id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        reloadData();
        MySwal.fire({
          position: "center",
          icon: "success",
          title: "Đã Xoá Thành Công",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const error = await res.json();
        MySwal.fire({
          position: "center",
          icon: "success",
          title: error.message || "xóa thất bại",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <>
      <button className="text-blue-500 hover:underline" onClick={handlerDelete}>
        Xóa
      </button>
    </>
  );
};

export default DeleteAddress;
