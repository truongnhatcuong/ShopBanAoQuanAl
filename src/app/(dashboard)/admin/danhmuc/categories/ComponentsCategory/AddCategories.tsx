"use client";
import React, { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const AddCategories = (props: {
  closeHandle: () => void;
  reloadData: () => void;
}) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState(true);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch(`/api/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setName("");
      setDescription("");
      props.closeHandle();
      props.reloadData();

      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Thông báo!",
        text: "Thêm sản Phẩm Thành Công",
        icon: "success",
        confirmButtonText: "OK",
      });
      props.closeHandle();
      setShowAddModal(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  return (
    <Modal
      isOpen={showAddModal}
      ariaHideApp={false}
      onRequestClose={props.closeHandle}
      contentLabel="Thêm sản phẩm mới"
      className="fixed  top-[50%] left-[58%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-3/5 "
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-70"
    >
      <h2 className="text-xl font-bold">Thêm sản phẩm mới</h2>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            placeholder=" nhập tên sản phẩm ..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded-lg border-solid border-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            placeholder=" mô tả sản phẩm ..."
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 rounded-lg border-solid border-2 w-full"
            required
          />
        </div>
        <div className="flex justify-end space-x-4">
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
          >
            Lưu
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddCategories;
