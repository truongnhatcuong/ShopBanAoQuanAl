"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const AddSupplier = (props: { closeHandle: any; reloadData: () => void }) => {
  const [supplier_name, setSupplier_name] = useState<string>("");
  const [contact_info, setContact_info] = useState<number | string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function AddSupplierHandle(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    const req = await fetch(`/api/supplier`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ supplier_name, contact_info }),
    });
    if (req.ok) {
      const data = await req.json();
      console.log(data);

      setLoading(false);
      props.closeHandle();
      setSupplier_name("");
      setContact_info("");
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Thông báo!",
        text: "Thêm supplier Thành Công",
        icon: "success",
        confirmButtonText: "OK",
      });
      props.reloadData();
    } else {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Thông báo!",
        text: "lỗi ",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }

  return (
    <div>
      <Modal
        isOpen={true}
        ariaHideApp={false}
        onRequestClose={props.closeHandle}
        contentLabel="Thêm Thương Hiệu"
        className="fixed  top-[50%] left-[58%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-3/5 "
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-70"
      >
        <h2 className="text-xl font-bold">Thêm Nhà Cung Cấp Mới</h2>
        <form className="mt-4" onSubmit={AddSupplierHandle}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-3"></label>
            <input
              type="text"
              placeholder=" Nhập Tên Nhà Cung Cấp..."
              value={supplier_name}
              onChange={(e) => setSupplier_name(e.target.value)}
              className="p-2 rounded-lg border-solid border-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Liên Hệ</label>
            <input
              type="number" // Changed to "number"
              value={contact_info}
              placeholder="Nhập Số Điện Thoại ..."
              onChange={(e) => setContact_info(e.target.value)}
              className="p-2 rounded-lg border-solid border-2 w-full"
              required
            />
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              className="bg-red-500 text-white py-2 px-10 rounded-md ml-2 hover:bg-red-700"
              onClick={props.closeHandle}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-10 rounded-md hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "đang lưu..." : "lưu"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddSupplier;
