import React from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface IOrder {
  orderId: number;
  reloadData: () => void;
}
const CancellOrder = ({ orderId, reloadData }: IOrder) => {
  const MySwal = withReactContent(Swal);
  const handleCancell = async () => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "Bạn có chắc chắn muốn hủy đơn hàng này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "   Hủy Đơn Hàng!",
    });
    if (result.isConfirmed) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/order/${orderId}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        toast.success("đơn hàng của bạn đã được hủy");
        reloadData();
      } else {
        const error = await res.json();
        toast.error(error.message || "hủy đơn hàng thất bại");
      }
    }
  };
  return (
    <>
      <button
        className="border px-4 py-2 rounded text-sm"
        onClick={handleCancell}
      >
        Hủy Đơn Hàng
      </button>
    </>
  );
};

export default CancellOrder;
