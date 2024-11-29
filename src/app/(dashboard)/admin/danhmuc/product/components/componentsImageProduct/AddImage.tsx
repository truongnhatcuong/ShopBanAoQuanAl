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
    <div className="flex items-center gap-3">
      <div>
        <label className="block text-sm font-medium mb-4 uppercase ">
          THêm ảnh tại đây{" "}
        </label>
        <input
          type="file"
          multiple // Cho phép chọn nhiều ảnh
          accept="image/*" // Chỉ chấp nhận file ảnh
          onChange={handleChangFile}
          className="file-input file-input-bordered file-input-lg w-full max-w-xs"
        />
      </div>
      <button
        onClick={AddImage}
        className="btn btn-primary mt-9"
        disabled={images.length === 0}
      >
        <MdAddPhotoAlternate className=" text-4xl " />
      </button>
    </div>
  );
};

export default AddImage;
