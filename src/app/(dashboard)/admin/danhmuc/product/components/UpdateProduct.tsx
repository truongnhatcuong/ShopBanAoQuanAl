/* eslint-disable @next/next/no-img-element */
"use client";
import Title from "@/app/(client)/components/Title";
import { assets } from "@/app/assets/frontend_assets/assets";
import DeleteImage from "@/app/(dashboard)/admin/danhmuc/product/components/componentsImageProduct/DeleteImage";
import React, { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AddImage from "./componentsImageProduct/AddImage";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import SelectCategories from "./componentChild/SelectCategories";
import SelectBrand from "./componentChild/SelectBrand";
import SelectSeaSon from "./componentChild/SelectSeason";

interface IProduct {
  product_id: number;
  product_name: string;
  price: number;
  description: string;
  category_id: number;
  brand_id: number;
  stock_quantity: number;
  color: string;
  season_id: number;
  sizes: any[];
  ProductSizes: {
    stock_quantity: number;
    Size?: {
      size_id: number;
      name_size: string;
    };
  }[];
  Images: {
    image_id: number;
    image_url: string;
  }[];
  reloadData: () => void;
}

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
  size_id: number;
  name_size: string;
}

const UpdateProduct = (props: IProduct) => {
  const MySwal = withReactContent(Swal);
  const [category, setCategory] = useState<ICategory[]>([]);
  const [brand, setBrand] = useState<IBrand[]>([]);
  const [season, setSeason] = useState<ISeason[]>([]);
  const [size, setSize] = useState<ISize[]>([]);

  const [showUpdate, setShowUpdate] = useState(false);
  const [product_name, setproduct_name] = useState(props.product_name);
  const [description, setDescription] = useState(props.description);
  const [price, setPrice] = useState(props.price);
  const [color, setColor] = useState(props.color);
  const [category_id, setCategoryId] = useState<number | null>(
    props.category_id
  );
  const [brand_id, setBrandId] = useState<number | null>(props.brand_id);
  const [season_id, setSeasonId] = useState<number | null>(props.season_id);
  const [sizeInput, setSizeInput] = useState(
    props.ProductSizes.map((item) => ({
      size_id: item.Size?.size_id || 0,
      stock_quantity: item.stock_quantity,
    }))
  );
  const [images, setImages] = useState<
    { image_id: number; image_url: string }[]
  >(
    props.Images.map((item) => ({
      image_id: item.image_id,
      image_url: item.image_url,
    }))
  );

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

  const handleDeleteImage = (imaga_id: number) => {
    setImages((pev) => pev.filter((item) => item.image_id !== imaga_id));
  };

  const fetchData = useCallback(async () => {
    try {
      const [categoryRes, brandRes, seasonRes, sizeRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
          next: { revalidate: 3600 },
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/brand`, {
          next: { revalidate: 3600 },
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/season`, {
          next: { revalidate: 86400 },
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/size`, {
          next: { revalidate: 86400 },
        }),
      ]);

      const [categoriesData, brandData, seasonData, sizeData] =
        await Promise.all([
          categoryRes.json(),
          brandRes.json(),
          seasonRes.json(),
          sizeRes.json(),
        ]);

      setCategory(categoriesData.categories);
      setBrand(brandData.brand);
      setSeason(seasonData.season);
      setSize(sizeData.size);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu sản phẩm:", error);
    }
  }, []);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cập nhật thông tin sản phẩm
  async function UpdateProduct(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product/${props.product_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
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
      }
    );

    if (res.ok) {
      MySwal.fire("Thành công", "Cập nhật sản phẩm thành công!", "success");
      props.reloadData();

      setShowUpdate(false);
    } else {
      const errorData = await res.json();
      MySwal.fire("Thông báo", errorData.message || "Có lỗi xảy ra!", "error");
    }
  }

  return (
    <div>
      <button
        className="p-2 text-white bg-blue-500 hover:bg-blue-600 rounded text-xl"
        onClick={() => setShowUpdate(true)}
      >
        <FaRegEdit />
      </button>
      {showUpdate && (
        <Modal
          isOpen={true}
          ariaHideApp={false}
          onRequestClose={() => setShowUpdate(false)}
          contentLabel="Cập nhật Sản Phẩm"
          className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-3/5 overflow-y-auto max-h-screen"
          overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-70"
        >
          <div className="text-2xl text-center mb-2">
            <Title title1="Cập Nhật" title2="Sản Phẩm" />
          </div>
          <form onSubmit={UpdateProduct}>
            {/* Danh Mục, Thương Hiệu, Mùa - trên cùng một hàng */}
            <div className="mb-4 flex space-x-5 justify-between">
              <SelectCategories
                categories={category}
                category_id={category_id}
                onCategoryChange={setCategoryId}
              />
              <SelectBrand
                brand={brand}
                brand_id={brand_id}
                onChangeBrand={setBrandId}
              />
              <SelectSeaSon
                onchangeSeason={setSeasonId}
                season={season}
                season_id={season_id}
              />
            </div>
            {/* Tên Sản Phẩm */}
            <div className="mb-4">
              <label className="block text-sm font-semibold uppercase">
                Tên sản phẩm
              </label>
              <input
                type="text"
                value={product_name}
                placeholder="Nhập tên sản phẩm"
                onChange={(e) => setproduct_name(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            {/* Giá và Màu */}
            <div className="mb-4 flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-semibold uppercase">
                  Giá Tiền
                </label>
                <input
                  type="text"
                  placeholder="Nhập giá tiền"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-semibold uppercase">
                  Màu Sản Phẩm
                </label>
                <input
                  type="text"
                  placeholder="Chọn màu"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
            </div>
            {/* Kích thước và số lượng */}
            <label className="block text-sm font-semibold uppercase mb-1">
              Vui lòng Nhập Lại Kích Thước
            </label>
            <div className="mb-4 flex flex-wrap gap-4">
              {sizeInput.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center mb-2 gap-2 border border-gray-200 rounded-md p-2"
                >
                  <select
                    className="w-25 border border-gray-400 rounded-md p-2"
                    value={item.size_id}
                    onChange={(e) =>
                      handleSizeChange(index, "size_id", Number(e.target.value))
                    }
                  >
                    <option value="">Chọn Kích Thước</option>
                    {size.map((size) => (
                      <option key={size.size_id} value={size.size_id}>
                        {size.name_size}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    className="w-20 border border-gray-300 rounded-md p-2 mr-2"
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
              {sizeInput.length < 4 && (
                <button
                  type="button"
                  onClick={handleAddSize}
                  className=" text-2xl mt-2 "
                >
                  <FaPlus />
                </button>
              )}
            </div>
            {/* Mô Tả */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Mô Tả</label>
              <textarea
                value={description}
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="flex justify-between">
              {/* hiển thị hình ảnh */}
              <div className="mb-4 ">
                <label className="block text-sm font-medium mb-4 uppercase ">
                  ảnh của sản phẩm
                </label>
                <div className="flex flex-row text-sm font-semibold gap-6">
                  {images.map((item, index) => (
                    <div key={index}>
                      <img
                        src={item.image_url}
                        alt={item.image_url}
                        className="w-20 h-20 object-cover border-gray-700 border cursor-pointer"
                      />

                      <div className="flex justify-center mt-3">
                        <DeleteImage
                          image_id={item.image_id}
                          DeleteImageAction={handleDeleteImage}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* thêm hình ảnh */}
              <div>
                <AddImage
                  reloadData={props.reloadData}
                  product_id={props.product_id}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-10 mt-5">
              <button
                type="button"
                className="bg-red-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700"
                onClick={() => setShowUpdate(false)}
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

export default UpdateProduct;
