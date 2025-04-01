"use client";
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
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
  reloadData,
}: {
  Brand: IBrand;
  reloadData: () => void;
}) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    brandName: Brand.brand_name,
    description: Brand.description,
  });
  const MySwal = withReactContent(Swal);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const UpdateHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/brand/${Brand.brand_id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
    const data = await req.json();
    if (req.ok) {
      setModalIsOpen(false);
      MySwal.fire({
        title: "Thông báo!",
        text: data.message || "Updated Thành Công",
        icon: "success",
        confirmButtonText: "OK",
      });
      reloadData();
    } else {
      MySwal.fire({
        title: "Thông báo!",
        text: data.message || "lỗi khi updated brand",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <>
      <button
        className="p-2 text-white bg-blue-500 hover:bg-blue-600 rounded text-xl"
        onClick={() => setModalIsOpen(true)}
      >
        <FaRegEdit />
      </button>
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          ariaHideApp={false}
          contentLabel="Thêm Thương Hiệu"
          className="fixed  top-[50%] left-[58%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-3/5"
          overlayClassName="fixed inset-0 bg-var(--bs-gray-500) bg-opacity-var(--bs-gray-500) "
        >
          <h2 className="text-xl font-bold">Thêm Thương Hiệu</h2>
          <form className="mt-4" onSubmit={UpdateHandler}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                placeholder=" nhập tên Thương Hiệu ..."
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                className="p-2 rounded-lg border-solid border-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                placeholder=" mô tả Thương Hiệu ..."
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={8}
                className="p-2 rounded-lg border-solid border-2 w-full"
                required
              />
            </div>
            <div className="flex gap-7 items-center justify-end">
              <button
                type="button"
                className="bg-red-500 text-white py-2 px-6 rounded-md ml-2 hover:bg-red-700"
                onClick={() => setModalIsOpen(false)}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-800"
              >
                Cập Nhật
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default UpdateBrand;
