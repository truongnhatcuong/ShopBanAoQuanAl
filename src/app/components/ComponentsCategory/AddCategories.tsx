"use client";
import React, { useState } from "react";
import Modal from "react-modal";
import useSWR, { mutate } from "swr";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AddCategories = (props: { closeHandle: () => void }) => {
  const { data, error, mutate } = useSWR("/api/categories", fetcher);
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

      mutate("/api/categories");

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
      onRequestClose={props.closeHandle}
      contentLabel="Thêm sản phẩm mới"
      className="fixed  top-[50%] left-[58%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-3/5"
      overlayClassName="fixed inset-0 bg-var(--bs-gray-500) bg-opacity-var(--bs-gray-500) "
    >
      <h2 className="text-xl font-bold">Thêm sản phẩm mới</h2>
      <form className="mt-4" onSubmit={handleSubmit}>
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
  );
};

export default AddCategories;
