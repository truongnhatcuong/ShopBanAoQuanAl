"use client";
import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AddImage from "../componentsImageProduct/AddImage";

interface IProduct {
  product_id: number;
  product_name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category_id: number;
  brand_id: number;
  season_id: number;
  color: string;
}
interface IBrand {
  brand_id: number;
  brand_name: string;
}

interface ISeason {
  season_id: number;
  season_name: string;
}

interface IUpdate {
  product: IProduct;
  closeHandle: () => void;
  reloadData: () => void;
}
interface ICategory {
  category_id: number;
  category_name: string;
  description: string;
}

const UpdateProduct = ({ product, closeHandle, reloadData }: IUpdate) => {
  const [product_name, setProduct_name] = useState(product.product_name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [color, setColor] = useState(product.color);
  const [stock_quantity, setStock_quantity] = useState(product.stock_quantity);
  const [category_id, setCategoryId] = useState(product.category_id);
  const [brand_id, setBrandId] = useState(product.brand_id);
  const [season_id, setSeasonId] = useState(product.season_id);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [seasons, setSeasons] = useState<ISeason[]>([]);
  const [isAddImageModalOpen, setAddImageModalOpen] = useState(false);

  const fetchUpdate = async () => {
    const categoryRes = await fetch("/api/categories");
    const brandRes = await fetch("/api/brand");
    const seasonRes = await fetch("/api/season");
    const categoryData = await categoryRes.json();
    const brandData = await brandRes.json();
    const seasonData = await seasonRes.json();
    setCategories(categoryData.categories);
    setBrands(brandData.brand);
    setSeasons(seasonData.season);
  };

  useEffect(() => {
    fetchUpdate();
  }, []);

  const toggleAddImageModal = () => {
    setAddImageModalOpen(!isAddImageModalOpen);
  };

  async function UpdateProductHandle(e: React.FormEvent) {
    e.preventDefault();
    const req = await fetch(`/api/product/${product.product_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_name,
        description,
        price,
        stock_quantity,
        color,
        category_id,
        brand_id,
        season_id,
      }),
    });
    if (req.ok) {
      closeHandle();
      reloadData();
      withReactContent(Swal).fire({
        title: "Thông báo!",
        text: "Cập nhật sản phẩm thành công!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      withReactContent(Swal).fire({
        title: "Thông báo!",
        text: "Lỗi khi cập nhật sản phẩm!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }

  return (
    <div>
      <Modal
        isOpen={true}
        ariaHideApp={false}
        onRequestClose={closeHandle}
        contentLabel="Cập Nhật Sản Phẩm"
        className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-3/5 overflow-y-auto max-h-screen"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-50"
      >
        <h2 className="text-xl font-bold">Cập Nhật Sản Phẩm</h2>
        <form className="mt-3" onSubmit={UpdateProductHandle}>
          {/* Danh Mục, Thương Hiệu và Mùa */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">Danh Mục</label>
              <select
                value={category_id ?? ""}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                className="p-2 rounded-lg border-solid border-2 w-full"
                required
              >
                <option value="" disabled>
                  Chọn danh mục
                </option>
                {categories.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Thương Hiệu</label>
              <select
                value={brand_id ?? ""}
                onChange={(e) => setBrandId(Number(e.target.value))}
                className="p-2 rounded-lg border-solid border-2 w-full"
                required
              >
                <option value="" disabled>
                  Chọn thương hiệu
                </option>
                {brands.map((brand) => (
                  <option key={brand.brand_id} value={brand.brand_id}>
                    {brand.brand_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Mùa</label>
              <select
                value={season_id ?? ""}
                onChange={(e) => setSeasonId(Number(e.target.value))}
                className="p-2 rounded-lg border-solid border-2 w-full"
                required
              >
                <option value="" disabled>
                  Chọn mùa
                </option>
                {seasons.map((season) => (
                  <option key={season.season_id} value={season.season_id}>
                    {season.season_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Tên Sản Phẩm */}
          <div>
            <label className="block text-gray-700">Tên Sản Phẩm</label>
            <input
              type="text"
              value={product_name}
              onChange={(e) => setProduct_name(e.target.value)}
              className="p-2 rounded-lg border-solid border-2 w-full"
              required
            />
          </div>

          {/*  Giá và Số Lượng Tồn Kho */}
          <div className="grid grid-cols-3 gap-4 mb-4 mt-7">
            <div>
              <label className="block text-gray-700">Giá</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="p-2 rounded-lg border-solid border-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Số Lượng Tồn Kho</label>
              <input
                type="text"
                value={stock_quantity}
                onChange={(e) => setStock_quantity(Number(e.target.value))}
                className="p-2 rounded-lg border-solid border-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700  ">Màu Sắc</label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="p-2 rounded-lg border-solid border-2 w-full"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Mô Tả</label>
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 rounded-lg border-solid border-2 w-full"
              required
            />
          </div>

          {/* Button to open AddImage Modal */}

          {/* Save and Cancel buttons */}
          <div className="flex justify-between items-center">
            <div>
              <button
                type="button"
                className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-700"
                onClick={toggleAddImageModal}
              >
                Thêm Hình Ảnh
              </button>
            </div>
            <div className="flex space-x-5">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-700 ml-2"
              >
                Lưu
              </button>
              <button
                type="button"
                className="bg-red-500 text-white py-2 px-6 rounded-md ml-2 hover:bg-red-700"
                onClick={closeHandle}
              >
                Hủy
              </button>
            </div>
          </div>
        </form>
      </Modal>

      {/* Modal to Add Images */}
      {isAddImageModalOpen && (
        <AddImage
          closeHandle={toggleAddImageModal}
          reloadData={reloadData}
          selectedProductId={product.product_id}
          selectedProductName={product.product_name}
        />
      )}
    </div>
  );
};

export default UpdateProduct;
