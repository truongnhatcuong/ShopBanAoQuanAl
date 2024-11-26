import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
interface IImage {
  image_id: number;
  product_id: number;
  image_url: string;
}

interface IDelete {
  image: IImage;
  DeleteImageAction: (image_id: number) => void;
}
const DeleteImage = ({ image, DeleteImageAction }: IDelete) => {
  async function DeleteHandle() {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa danh mục này không?"
    );
    if (!confirmDelete) {
      return;
    }
    /////
    const res = await fetch(`/api/Image/${image.image_id}`, {
      method: "DELETE",
    });
    /////
    if (res.ok) {
      const data = await res.json();
      DeleteImageAction(image.image_id);
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
        className="p-1 text-white bg-red-500 hover:bg-red-600 rounded-md font-bold flex items-center"
        onClick={DeleteHandle}
      >
        DELETE
      </button>
    </div>
  );
};

export default DeleteImage;
