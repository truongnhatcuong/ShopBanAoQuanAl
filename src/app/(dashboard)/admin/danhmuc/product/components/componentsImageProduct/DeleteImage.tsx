import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ImBin } from "react-icons/im";

interface IDelete {
  image_id: number;
  DeleteImageAction: (image_id: number) => void;
}

const DeleteImage = ({ image_id, DeleteImageAction }: IDelete) => {
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

    if (result.isConfirmed) {
      const res = await fetch(`/api/ImageProduct/${image_id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await res.json();
        DeleteImageAction(image_id);
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
    /////
  }

  return (
    <div>
      <div
        className=" text-red-500  hover:text-red-700 rounded-md text-2xl "
        onClick={DeleteHandle}
      >
        <ImBin />
      </div>
    </div>
  );
};

export default DeleteImage;
