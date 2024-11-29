"use client";
import React, { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface IBrand {
  brand_id: number;
  brand_name: string;
  description: string;
}

const UpdateBrand = ({
  Brand,
  closeHandle,
  reloadData,
}: {
  Brand: IBrand;
  closeHandle: () => void;
  reloadData: () => void;
}) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(true);
  const [brand_name, setBrand_name] = useState(Brand.brand_name);
  const [description, setDescription] = useState<string>(Brand.description);

  const UpdateHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const req = await fetch(`/api/brand/${Brand.brand_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand_name, description }),
    });
    if (req.ok) {
      const data = await req.json();
      console.log(data);
      setBrand_name("");
      setDescription("");
      closeHandle();
      setModalIsOpen(() => false);
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Thông báo!",
        text: "Updated Thành Công",
        icon: "success",
        confirmButtonText: "OK",
      });
      reloadData();
    } else {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Thông báo!",
        text: "lỗi khi updated brand",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeHandle}
        contentLabel="Thêm Thương Hiệu"
        className="fixed  top-[50%] left-[58%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-3/5"
        overlayClassName="fixed inset-0 bg-var(--bs-gray-500) bg-opacity-var(--bs-gray-500) "
      >
        <h2 className="text-xl font-bold">Thêm Thương Hiệu</h2>
        <form className="mt-4" onSubmit={UpdateHandler}>
          <div className="mb-4">
            <label className="block text-gray-700">ID</label>
            <input
              type="text"
              value={Brand.brand_id}
              className="p-2 rounded-lg border-solid border-2 w-full bg-gray-100"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              placeholder=" nhập tên Thương Hiệu ..."
              value={brand_name}
              onChange={(e) => setBrand_name(e.target.value)}
              className="p-2 rounded-lg border-solid border-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              placeholder=" mô tả Thương Hiệu ..."
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 rounded-lg border-solid border-2 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-800"
          >
            Update
          </button>
          <button
            type="button"
            className="bg-red-500 text-white py-2 px-4 rounded-md ml-2 hover:bg-red-700"
            onClick={closeHandle}
          >
            Hủy
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default UpdateBrand;
