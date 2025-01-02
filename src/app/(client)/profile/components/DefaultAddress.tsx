import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface IDefault {
  address_id: number;
  reloadData: () => void;
}
const DefaultAddress = ({ address_id, reloadData }: IDefault) => {
  const handlerDefault = async () => {
    const res = await fetch(`/api/addressShiper/${address_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "setDefault",
      }),
    });
    if (res.ok) {
      await res.json();
      reloadData();
    } else {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        position: "center",
        icon: "error",
        title: "địa chỉ đã được đặt làm mặt định",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <>
      <span
        className="border border-gray-500 px-4 py-1 rounded hover:bg-gray-50 cursor-pointer"
        onClick={handlerDefault}
      >
        Thiết lập Mặc Định
      </span>
    </>
  );
};

export default DefaultAddress;
