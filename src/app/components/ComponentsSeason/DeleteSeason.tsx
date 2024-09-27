import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface IdeleteSeason {
  season_id: number;
  DeleteHandler: (season_id: number) => void;
}

const DeleteSeason = ({ season_id, DeleteHandler }: IdeleteSeason) => {
  const [show, setshow] = useState(true);

  async function DeleteSeason() {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa danh mục này không?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      const req = await fetch(`/api/season/${season_id}`, {
        method: "DELETE",
      });
      const data = await req.json();
      console.log(data);

      DeleteHandler(season_id);
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Thông báo!",
        text: "Xóa Brand Thành Công",
        icon: "success",
        confirmButtonText: "OK",
      });
      setshow(false);
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
        className=" bg-red-500 hover:bg-red-600 text-white  p-1 rounded-md"
        onClick={DeleteSeason}
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteSeason;
