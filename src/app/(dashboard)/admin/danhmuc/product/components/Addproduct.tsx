/* eslint-disable @next/next/no-img-element */
"use client";

import Title from "@/app/(client)/components/Title";
import { assets } from "@/app/assets/frontend_assets/assets";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface ICategory {
  category_id: number;
  category_name: string;
}

interface IBrand {
  brand_id: number;
  brand_name: string;
}
interface ISeason {
  season_id: number;
  season_name: string;
}
interface ISize {
  size_id: Number;
  name_size: string;
}

const AddProduct = (props: { reloadData: () => void }) => {
  // hiển thị tên các danh mục
  const [category, setCategory] = useState<ICategory[] | []>([]);
  const [brand, setBrand] = useState<IBrand[]>([]);
  const [season, setSeason] = useState<ISeason[]>([]);
  const [size, setSize] = useState<ISize[]>([]);
  //hook thêm sản phẩm
  const [showAdd, setShowAdd] = useState(false);
  const [product_name, setproduct_name] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [category_id, setCategoryId] = useState<number | null>(null);
  const [brand_id, setBrandId] = useState<number | null>(null);
  const [season_id, setSeasonId] = useState<number | null>(null);
  const [images, setImages] = useState<File[] | null>(null);
  const [sizeInput, setSizeInput] = useState([
    { size_id: 0, stock_quantity: 0 },
  ]);

  useEffect(() => {
    const fetchOptions = async () => {
      if (!category.length && !brand.length && !season.length && !size.length) {
        const categoryRes = await fetch("/api/categories");
        const brandRes = await fetch("/api/brand");
        const seasonRes = await fetch("/api/season");
        const sizeRes = await fetch("/api/size");

        // phản hồi
        const categoriesData = await categoryRes.json();
        const brandData = await brandRes.json();
        const seasonData = await seasonRes.json();
        const sizeData = await sizeRes.json();

        // gán dữ liệu
        setCategory(categoriesData.categories);
        setBrand(brandData.brand);
        setSeason(seasonData.season);
        setSize(sizeData.size);
      }
    };

    fetchOptions();
  }, [brand.length, category.length, season.length, size.length]);

  const handleSizeChange = (index: number, field: string, value: any) => {
    const uppdateSize: any = [...sizeInput];
    uppdateSize[index][field] = value;
    setSizeInput(uppdateSize);
  };

  const handleAddSize = () => {
    setSizeInput([...sizeInput, { size_id: 0, stock_quantity: 0 }]);
  };
  const handleDeleteSize = (index: number) => {
    const updateSize = sizeInput.filter((_, i) => i !== index);
    setSizeInput(updateSize);
  };

  const handleSubmitImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(filesArray);
    }
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !product_name ||
      !description ||
      !price ||
      !color ||
      !category_id ||
      !brand_id ||
      !season_id ||
      sizeInput.length === 0
    ) {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Thông báo!",
        text: "Vui lòng điền đầy đủ thông tin.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }
    const res = await fetch("/api/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_name,
        description,
        price,
        color,
        category_id,
        brand_id,
        season_id,
        sizes: sizeInput,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      const newdata = data.product_id;
      props.reloadData();
      setShowAdd(false);
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Thông báo!",
        text: "Thêm sản phẩm thành công",
        icon: "success",
        confirmButtonText: "OK",
      });

      //tạo formdata để upload ảnh
      const formData = new FormData();
      images?.forEach((image) => {
        formData.append("files", image); // Thay đổi từ "file" thành "files"
      });
      formData.append("product_id", newdata);
      const ImageRes = await fetch("/api/ImageProduct", {
        method: "POST",
        body: formData,
      });
      if (!ImageRes.ok) {
        MySwal.fire({
          title: "Thông báo!",
          text: "Lỗi khi thêm ảnh sản phẩm",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } else {
      const errorData = await res.json();
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Thông báo!",
        text: `Lỗi khi thêm sản phẩm: ${errorData.message}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowAdd(true)}
        className="bg-blue-500 px-6 py-3 rounded-md font-bold text-white hover:bg-blue-700 "
      >
        Thêm Sản Phẩm
      </button>

      {showAdd && (
        <Modal
          isOpen={true}
          ariaHideApp={false}
          onRequestClose={() => setShowAdd(false)}
          contentLabel="Thêm Sản Phẩm"
          className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-3/5 overflow-y-auto max-h-screen"
          overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-70"
        >
          <div className="text-2xl text-center mb-2">
            <Title title1="Thêm Mới" title2="Sản Phẩm" />
          </div>
          <form onSubmit={handleSubmitProduct}>
            {/* Danh Mục, Thương Hiệu, Mùa - trên cùng một hàng */}
            <div className="mb-4 flex space-x-5 justify-between">
              <div className="w-1/4">
                <label className="block text-sm font-semibold">
                  DANH MỤC
                  <select
                    value={category_id || ""}
                    onChange={(e) => setCategoryId(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-md p-2 "
                    required
                  >
                    <option value={""} disabled>
                      Chọn danh mục
                    </option>
                    {category.map((item) => (
                      <option value={item.category_id} key={item.category_id}>
                        {item.category_name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="w-1/4">
                <label className="block text-sm font-semibold">
                  THƯƠNG HIỆU
                  <select
                    value={brand_id || ""}
                    onChange={(e) => setBrandId(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-md p-2 "
                    required
                  >
                    <option value={""} disabled>
                      Chọn Thương Hiệu
                    </option>
                    {brand.map((item) => (
                      <option value={item.brand_id} key={item.brand_id}>
                        {item.brand_name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="w-1/4">
                <label className="block text-sm font-semibold">
                  Mùa
                  <select
                    value={season_id || ""}
                    onChange={(e) => setSeasonId(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-md p-2 "
                    required
                  >
                    <option value={""} disabled>
                      Chọn Mùa
                    </option>
                    {season.map((item) => (
                      <option value={item.season_id} key={item.season_id}>
                        {item.season_name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
            {/* Tên Sản Phẩm - 1 hàng riêng */}
            <div className="mb-4">
              <label className="block text-sm font-semibold uppercase">
                Tên sản phẩm
              </label>
              <input
                type="text"
                value={product_name}
                placeholder="Nhập tên sản phẩm"
                onChange={(e) => setproduct_name(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:no-underline "
              />
            </div>
            {/* Giá và Màu - trên một hàng */}
            <div className="mb-4 flex space-x-4">
              <div className="w-1/2">
                <label
                  htmlFor=""
                  className="block text-sm font-semibold uppercase"
                >
                  Giá Tiền
                </label>
                <input
                  type="text"
                  id="price"
                  placeholder="Nhập giá tiền"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 "
                  required
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor=""
                  className="block text-sm font-semibold uppercase"
                >
                  Màu Sản Phẩm
                </label>
                <input
                  type="text"
                  placeholder="Chọn màu "
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
            </div>
            {/* kích thước và số lượng */}
            <div className="mb-4 ">
              <label className="block text-sm font-semibold uppercase">
                Kích Thước và Số Lượng
              </label>
              {sizeInput.map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                  <select
                    className="w-1/3 border border-gray-400 rounded-md p-2 mr-2"
                    value={item.size_id}
                    onChange={(e) =>
                      handleSizeChange(index, "size_id", Number(e.target.value))
                    }
                  >
                    <option value="">Chọn Kích Thước</option>
                    {size.map((size) => (
                      <option
                        key={Number(size.size_id) || null}
                        value={Number(size.size_id)}
                        className="text-black font-medium"
                      >
                        {size.name_size}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    className="w-1/3 border border-gray-300 rounded-md p-2 mr-2"
                    placeholder="Số lượng"
                    value={item.stock_quantity || ""}
                    onChange={(e) =>
                      handleSizeChange(
                        index,
                        "stock_quantity",
                        Number(e.target.value)
                      )
                    }
                  />
                  {sizeInput.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteSize(index)}
                      className="bg-red-500 hover:bg-red-700 p-2 rounded-md"
                    >
                      <img src={assets.bin_icon.src} alt="" className="w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddSize}
                className="bg-green-500 text-white p-2 rounded-md"
              >
                Thêm Kích Thước
              </button>
            </div>
            {/* Mô Tả */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-semibold"
              >
                Mô Tả
              </label>
              <textarea
                id="description"
                value={description}
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="productImage"
                className="block text-sm font-semibold"
              >
                Ảnh Sản Phẩm
              </label>
              <input
                type="file"
                multiple
                className="file-input file-input-bordered file-input-lg w-full max-w-xs"
                onChange={handleSubmitImage}
              />
            </div>

            <div className="flex justify-end space-x-12">
              <button
                type="button"
                className="bg-red-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700"
                onClick={() => setShowAdd(false)}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700"
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

export default AddProduct;
