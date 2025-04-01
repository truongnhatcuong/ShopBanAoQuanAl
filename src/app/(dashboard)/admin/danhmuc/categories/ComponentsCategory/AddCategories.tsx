"use client";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import Modal from "react-modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const AddCategories = (props: { reloadData: () => void }) => {
  const [categoriesName, setCategoriesName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState(false);
  const MySwal = withReactContent(Swal);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoriesName, description }),
      }
    );
    const data = await res.json();
    if (res.ok) {
      setCategoriesName("");
      setDescription("");
      setShowAddModal(false);
      MySwal.fire({
        title: "Thông báo!",
        text: "Thêm sản Phẩm Thành Công",
        icon: "success",
        confirmButtonText: "OK",
      });
      props.reloadData();
    } else {
      MySwal.fire({
        title: "Thông báo!",
        text: data.message || "lỗi khi tạo danh mục",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }

  return (
    <>
      <button
        className="bg-blue-600 px-2 py-1 h-10 mt-1 font-bold text-white hover:bg-blue-700 flex items-center"
        onClick={() => setShowAddModal(true)}
      >
        <FiPlus /> <span>Thêm mới</span>
      </button>
      {showAddModal && (
        <Modal
          isOpen={showAddModal}
          ariaHideApp={false}
          contentLabel="Thêm sản phẩm mới"
          className="fixed max-w-5xl  top-[50%] left-[58%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-3/5 "
          overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-70"
        >
          <h2 className="text-xl font-bold">Thêm danh mục mới</h2>
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                placeholder=" nhập tên sản phẩm ..."
                value={categoriesName}
                onChange={(e) => setCategoriesName(e.target.value)}
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
                rows={8}
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="bg-red-500 text-white py-2 px-10 rounded-md ml-2 hover:bg-red-700"
                onClick={() => setShowAddModal(false)}
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
      )}
    </>
  );
};

export default AddCategories;
