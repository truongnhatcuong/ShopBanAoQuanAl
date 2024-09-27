"use client";
import React, { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const AddSupplier = (props: { closeHandle: any; reloadData: () => void }) => {
  const [supplier_name, setSupplier_name] = useState<string>("");
  const [contact_info, setContact_info] = useState<string>("");
  const [modalIsOpen, setmodalIsOpen] = useState<boolean>(true);

  async function AddSupplierHandle(e: React.FormEvent) {
    e.preventDefault();
    const req = await fetch(`/api/supplier`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ supplier_name, contact_info }),
    });
    if (req.ok) {
      const data = await req.json();
      console.log(data);

      setmodalIsOpen(true);
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
        isOpen={modalIsOpen}
        onRequestClose={props.closeHandle}
        contentLabel="Thêm Thương Hiệu"
        className="fixed  top-[50%] left-[58%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-3/5"
        overlayClassName="fixed inset-0 bg-var(--bs-gray-500) bg-opacity-var(--bs-gray-500) "
      >
        <h2 className="text-xl font-bold">Thêm Mùa Mới</h2>
        <form className="mt-4" onSubmit={AddSupplierHandle}>
          <div className="mb-4">
            <label className="block text-gray-700">ID</label>
            <input
              type="text"
              value={"ID Sẽ Được Tạo Tự Động"}
              className="p-2 rounded-lg border-solid border-2 w-full bg-gray-100"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Name Supplier</label>
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
            <label className="block text-gray-700">contact</label>
            <input
              type="text" // Changed to "number"
              value={contact_info}
              placeholder="Nhập số liên lạc..."
              onChange={(e) => setContact_info(e.target.value)}
              className="p-2 rounded-lg border-solid border-2 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            Lưu
          </button>
          <button
            type="button"
            className="bg-red-500 text-white py-2 px-4 rounded-md ml-2 hover:bg-red-700"
            onClick={props.closeHandle}
          >
            Hủy
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddSupplier;
