"use client";
import React, { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const AddBrand = (props: {
  closeHandle: () => void;
  reloadData: () => void;
}) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(true);
  const [brand_name, setBrand_name] = useState("");
  const [description, setDescription] = useState<string>("");

  const Addhandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const req = await fetch("/api/brand", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand_name, description }),
    });
    if (req.ok) {
      const data = await req.json();
      console.log(data);
      setBrand_name("");
      setDescription("");
      props.closeHandle();
      setModalIsOpen(() => false);
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Thông báo!",
        text: "Thêm brand Thành Công",
        icon: "success",
        confirmButtonText: "OK",
      });
      props.reloadData();
    } else {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Thông báo!",
        text: "lỗi khi thêm brand",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <div>
      <Modal
        isOpen={true}
        ariaHideApp={false}
        onRequestClose={props.closeHandle}
        contentLabel="Thêm Thương Hiệu"
        className="fixed  top-[50%] left-[58%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-3/5 "
        overlayClassName="fixed inset-0  "
      >
        <h2 className="text-xl font-bold">Thêm Thương Hiệu</h2>
        <form className="mt-4" onSubmit={Addhandler}>
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
          <div className="mb-4 mt-5 ">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              rows={7}
              placeholder=" mô tả Thương Hiệu ..."
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
    </div>
  );
};

export default AddBrand;
