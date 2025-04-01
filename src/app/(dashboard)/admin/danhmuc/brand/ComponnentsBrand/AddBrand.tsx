"use client";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import Modal from "react-modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const AddBrand = (props: { reloadData: () => void }) => {
  const [formData, setFormData] = useState({ brandName: "", description: "" });
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const MySwal = withReactContent(Swal);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const Addhandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const req = await fetch("/api/brand", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await req.json();
    if (req.ok) {
      setFormData({ brandName: "", description: "" });
      setShowAdd(false);

      MySwal.fire({
        title: "Thông báo!",
        text: "Thêm thương hiệu Thành Công",
        icon: "success",
        confirmButtonText: "OK",
      });
      props.reloadData();
    } else {
      MySwal.fire({
        title: "Thông báo!",
        text: data.message.join(","),
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <div>
      <button
        className="bg-blue-600 px-2 py-1 h-10 font-bold text-white hover:bg-blue-700 flex items-center"
        onClick={() => setShowAdd(true)}
      >
        <FiPlus /> <span>Thêm mới</span>
      </button>
      {showAdd && (
        <Modal
          isOpen={true}
          ariaHideApp={false}
          contentLabel="Thêm Thương Hiệu"
          className="fixed  top-[50%] left-[58%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-3/5 "
          overlayClassName="fixed inset-0  "
        >
          <h2 className="text-xl font-bold">Thêm Thương Hiệu</h2>
          <form className="mt-4" onSubmit={Addhandler}>
            <div className="mb-4">
              <label className="block text-gray-700">Thương Hiệu</label>
              <input
                type="text"
                name="brandName"
                placeholder=" nhập tên Thương Hiệu ..."
                value={formData.brandName}
                onChange={handleChange}
                className="p-2 rounded-lg border-solid border-2 w-full"
                required
              />
            </div>
            <div className="mb-4 mt-5 ">
              <label className="block text-gray-700">Mô tả thương hiệu</label>
              <textarea
                name="description"
                value={formData.description}
                rows={7}
                placeholder=" mô tả Thương Hiệu ..."
                onChange={handleChange}
                className="p-2 rounded-lg border-solid border-2 w-full"
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="bg-red-500 text-white py-2 px-10 rounded-md ml-2 hover:bg-red-700"
                onClick={() => setShowAdd(false)}
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
    </div>
  );
};

export default AddBrand;
