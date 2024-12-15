/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
interface IAdd {
  product_id: number;
  reloadData: () => void;
}
const AddImage = ({ product_id, reloadData }: IAdd) => {
  const MySwal = withReactContent(Swal);
  const [images, setImages] = useState<File[]>([]);
  const handleChangFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };
  const formData = new FormData();
  images?.map((image) => {
    formData.append("files", image);
  });
  formData.append("product_id", product_id.toString());
  async function AddImage(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/ImageProduct", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      setImages([]);
      reloadData();
      MySwal.fire({
        title: "Thông báo!",
        text: "thêm hình ảnh thành công vui lòng bấm lưu",
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      await res.json();
      MySwal.fire({
        title: "Thông báo!",
        text: "Lỗi khi thêm ảnh sản phẩm",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }
  return (
    <div className="flex flex-col items-center gap-6 justify-end">
      <div className="flex flex-col items-center gap-3">
        <span className="text-sm text-gray-500 font-medium uppercase">
          Thêm ảnh tại đây
        </span>
        <label
          htmlFor="productImage"
          className="flex flex-col items-center gap-2 cursor-pointer"
        >
          {images.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {images.map((item, index) => (
                <img
                  src={URL.createObjectURL(item)}
                  alt=""
                  key={index}
                  className="w-24 h-20 object-cover rounded-md shadow"
                />
              ))}
            </div>
          ) : (
            <img
              src={"/Image/upload_area.png"}
              alt=""
              className="w-32 h-25 object-contain "
            />
          )}

          <input
            type="file"
            multiple
            id="productImage"
            accept="image/*"
            onChange={handleChangFile}
            className="hidden"
          />
        </label>
      </div>
      {images.length > 0 && (
        <button
          onClick={AddImage}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={images.length === 0}
        >
          <MdAddPhotoAlternate
            className="text-2xl "
            title="khi thêm ảnh bấm vào đây để cập nhật ảnh"
          />
        </button>
      )}
    </div>
  );
};

export default AddImage;
