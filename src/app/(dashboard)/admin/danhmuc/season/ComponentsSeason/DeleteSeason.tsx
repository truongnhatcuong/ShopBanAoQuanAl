import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface IdeleteSeason {
  season_id: number;
  DeleteHandler: (season_id: number) => void;
}

const DeleteSeason = ({ season_id, DeleteHandler }: IdeleteSeason) => {
  const [show, setshow] = useState(true);
  const MySwal = withReactContent(Swal);
  async function DeleteSeason() {
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
          `${process.env.NEXT_PUBLIC_API_URL}/api/season/${season_id}`,
          {
            method: "DELETE",
          }
        );
        if (res.ok) {
          const data = await res.json();
          console.log(data);

          DeleteHandler(season_id);
          MySwal.fire({
            title: "Thông báo!",
            text: "Xóa Mùa Thành Công",
            icon: "success",
            confirmButtonText: "OK",
          });
          setshow(false);
        } else {
          const error = await res.json();
          MySwal.fire({
            title: "Thông báo!",
            text: error.message || "Xóa Mùa Thất Bại",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    } catch (error: any) {
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
        onClick={DeleteSeason}
      >
        <AiOutlineDelete />
      </button>
    </div>
  );
};

export default DeleteSeason;
