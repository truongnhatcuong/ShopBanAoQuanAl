"use client";
import React, { useState } from "react";
import Modal from "react-modal";
import useSWR, { mutate } from "swr";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Icategories {
  category_id: number;
  category_name: string;
  description: string;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const UpdateCategories = ({
  category,
  closeHandle,
}: {
  category: Icategories;
  closeHandle(): void;
}) => {
  const { data, error, mutate } = useSWR("/api/categories", fetcher);
  const [category_name, setName] = useState<string>(category.category_name);
  const [description, setDescription] = useState<string>(category.description);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(true);

  async function handleUpdate(e: any) {
    e.preventDefault();

    if (category_name.length <= 5) {
      toast.error("Vui Lòng Nhập Tối Thiểu 5 Kí Tự", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    } else if (category_name.length > 255) {
      toast.error("Vui Lòng Nhập Tối Đa 255 Kí Tự", {
        position: "top-right",
        autoClose: 5000,
      });
      return; // Add this return statement to prevent further execution
    }

    const response = await fetch(`/api/categories/${category.category_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category_name, description }),
    });

    if (response.ok) {
      const updatedData = await response.json();
      console.log(updatedData);
      console.log("Mutate called");

      mutate("/api/categories", { revalidate: true });

      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Thông báo!",
        text: "Cập nhật danh mục thành công",
        icon: "success",
        confirmButtonText: "OK",
      });
      closeHandle();
    } else {
      const errorData = await response.json();
      console.error("Error updating category:", errorData.error);

      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Lỗi!",
        text: errorData.error || "Có lỗi xảy ra khi cập nhật danh mục",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeHandle}
      contentLabel="Cập nhật danh mục" // Changed from "sản phẩm" to "danh mục"
      className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-3/5"
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-50"
    >
      <h2 className="text-xl font-bold mb-4">Cập nhật danh mục</h2>
      <div className="mb-4">
        <p>
          <strong>ID:</strong> {category.category_id}
        </p>
      </div>
      <form className="mt-4" onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={category_name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded-lg border-solid border-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 rounded-lg border-solid border-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700"
        >
          Cập nhật
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
  );
};

export default UpdateCategories;
