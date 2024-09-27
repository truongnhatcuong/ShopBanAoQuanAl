"use client";
import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AddImage from "../componentsImageProduct/AddImage";
Image;

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

interface IUpdate {
  product: IProduct;
  closeHandle: () => void;
  reloadData: () => void;
}

const UpdateProduct = ({ product, closeHandle, reloadData }: IUpdate) => {
  const [product_name, setproduct_name] = useState(product.product_name);
  const [description, setdescription] = useState(product.description);
  const [price, setprice] = useState(product.price);
  const [color, setColor] = useState(product.color);
  const [stock_quantity, setstock_quantity] = useState(product.stock_quantity);
  const [category_id, setCategoryId] = useState(product.category_id);
  const [brand_id, setBrandId] = useState(product.brand_id);
  const [season_id, setSeasonId] = useState(product.season_id);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [seasons, setSeasons] = useState([]);
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
        onRequestClose={closeHandle}
        contentLabel="Cập Nhật Sản Phẩm"
        className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-3/5 overflow-y-auto max-h-screen"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-50"
      >
        <h2 className="text-xl font-bold">Cập Nhật Sản Phẩm</h2>
        <form className="mt-4" onSubmit={UpdateProductHandle}>
          {/* Các trường thông tin sản phẩm */}
          <div className="mb-4">
            <label className="block text-gray-700">Tên Sản Phẩm</label>
            <input
              type="text"
              placeholder="Nhập Tên Sản Phẩm..."
              value={product_name}
              onChange={(e) => setproduct_name(e.target.value)}
              className="p-2 rounded-lg border-solid border-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mô Tả</label>
            <textarea
              placeholder="Nhập mô tả..."
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              className="p-2 rounded-lg border-solid border-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Giá</label>
            <input
              type="number"
              placeholder="Nhập giá sản phẩm..."
              value={price}
              onChange={(e) => setprice(parseFloat(e.target.value))}
              className="p-2 rounded-lg border-solid border-2 w-full"
              min="0"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Số Lượng Tồn Kho</label>
            <input
              type="number"
              placeholder="Nhập số lượng tồn kho..."
              value={stock_quantity}
              onChange={(e) => setstock_quantity(parseInt(e.target.value))}
              className="p-2 rounded-lg border-solid border-2 w-full"
              min="0"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Màu Sản Phẩm</label>
            <input
              type="text"
              placeholder="Nhập Màu Sản Phẩm..."
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="p-2 rounded-lg border-solid border-2 w-full"
              required
            />
          </div>

          {/* Dropdown for Categories */}
          <div className="mb-4">
            <label className="block text-gray-700">Danh Mục</label>
            <select
              value={category_id || ""}
              onChange={(e) => setCategoryId(parseInt(e.target.value))}
              className="p-2 rounded-lg border-solid border-2 w-full "
            >
              <option value="" disabled>
                Chọn danh mục
              </option>
              {categories.map((category: any) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown for Brands */}
          <div className="mb-4">
            <label className="block text-gray-700">Thương Hiệu</label>
            <select
              value={brand_id || ""}
              onChange={(e) => setBrandId(parseInt(e.target.value))}
              className="p-2 rounded-lg border-solid border-2 w-full"
            >
              <option value="" disabled>
                Chọn thương hiệu
              </option>
              {brands.map((brand: any) => (
                <option key={brand.brand_id} value={brand.brand_id}>
                  {brand.brand_name}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown for Seasons */}
          <div className="mb-4">
            <label className="block text-gray-700">Mùa</label>
            <select
              value={season_id || ""}
              onChange={(e) => setSeasonId(parseInt(e.target.value))}
              className="p-2 rounded-lg border-solid border-2 w-full"
            >
              <option value="" disabled>
                Chọn mùa
              </option>
              {seasons.map((season: any) => (
                <option key={season.season_id} value={season.season_id}>
                  {season.season_name}
                </option>
              ))}
            </select>
          </div>

          {/* Button to open AddImage Modal */}
          <button
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            onClick={toggleAddImageModal}
          >
            Thêm Hình Ảnh
          </button>

          {/* Save and Cancel buttons */}
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 ml-2"
          >
            Lưu
          </button>
          <button
            type="button"
            className="bg-red-500 text-white py-2 px-4 rounded-md ml-2 hover:bg-red-700"
            onClick={closeHandle}
          >
            Hủy
          </button>
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
