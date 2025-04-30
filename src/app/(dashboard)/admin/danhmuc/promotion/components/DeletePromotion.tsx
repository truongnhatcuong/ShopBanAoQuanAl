import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";

interface IDeleteProps {
  id: number;
  reloadData: () => void;
}
const DeletePromotion = ({ id, reloadData }: IDeleteProps) => {
  const handleDeletePromotion = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/promotion/${id}`,
      { method: "DELETE" }
    );
    const data = await res.json();
    if (res.ok) {
      toast.success("Xóa Thành Công");
      reloadData();
    } else {
      toast.error(data?.error || "Xóa thất bại");
    }
  };
  return (
    <button
      className="p-2 text-white bg-red-500 hover:bg-red-600 rounded text-xl "
      onClick={handleDeletePromotion}
    >
      <AiOutlineDelete />
    </button>
  );
};

export default DeletePromotion;
