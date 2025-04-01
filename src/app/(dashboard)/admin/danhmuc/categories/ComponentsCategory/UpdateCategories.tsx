"use client";
import React, { useState } from "react";
import Modal from "react-modal";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegEdit } from "react-icons/fa";

interface Icategories {
  category_id: number;
  category_name: string;
  description: string;
}

const UpdateCategories = ({
  category,
  reloadData,
}: {
  category: Icategories;
  reloadData: () => void;
}) => {
  const [category_name, setName] = useState<string>(category.category_name);
  const [description, setDescription] = useState<string>(category.description);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const MySwal = withReactContent(Swal);
  async function handleUpdate(e: any) {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${category.category_id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category_name, description }),
      }
    );
    setLoading(false);
    if (response.ok) {
      const updatedData = await response.json();
      setIsOpen(false);

      MySwal.fire({
        title: "Thông báo!",
        text: "Cập nhật danh mục thành công",
        icon: "success",
        confirmButtonText: "OK",
      });
      reloadData();
    } else {
      const errorData = await response.json();
      MySwal.fire({
        title: "Lỗi!",
        text: errorData.error || "Có lỗi xảy ra khi cập nhật danh mục",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }

  return (
    <>
      <button
        className="p-2 text-white bg-blue-500 hover:bg-blue-600 rounded text-xl"
        onClick={() => setIsOpen(true)}
      >
        <FaRegEdit />
      </button>
      {isOpen && (
        <Modal
          isOpen={true}
          ariaHideApp={false}
          contentLabel="Cập nhật danh mục"
          className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-3/5"
          overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-70"
        >
          <h2 className="text-xl font-bold mb-4">Cập nhật danh mục</h2>
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
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="bg-red-500 text-white py-2 px-10 rounded-md ml-2 hover:bg-red-700"
                onClick={() => setIsOpen(false)}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-10 rounded-md hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "đang Lưu..." : "Lưu"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default UpdateCategories;
