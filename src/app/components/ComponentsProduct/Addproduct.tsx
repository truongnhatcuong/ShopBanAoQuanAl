/* eslint-disable @next/next/no-img-element */
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

const AddProduct = (props: {
  closeHanle: () => void;
  reloadData: () => void;
}) => {
  const [product_name, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock_quantity, setStockQuantity] = useState(0);
  const [color, setColor] = useState("");
  const [category_id, setCategoryId] = useState<number | null>(null);
  const [brand_id, setBrandId] = useState<number | null>(null);
  const [season_id, setSeasonId] = useState<number | null>(null);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [seasons, setSeasons] = useState<ISeason[]>([]);
  const [images, setImages] = useState<File[]>([]);

  // Fetch categories, brands, and seasons from the backend
  const fetchOptions = async () => {
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
    fetchOptions();
  }, []);

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).filter((file) =>
        file.type.startsWith("image/")
      );
      setImages(selectedFiles);
    }
  };

  // Remove image from list
  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const AddProductHandle = async (e: React.FormEvent) => {
    e.preventDefault();

    const req = await fetch("/api/product", {
      method: "POST",
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
      const productData = await req.json();
      const newProductId = productData.product_id;

      // Upload images after product creation
      await AddImageHandle(newProductId);

      // Close modal and reload data
      props.closeHanle();
      props.reloadData();

      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Thông báo!",
        text: "Thêm sản phẩm thành công",
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Thông báo!",
        text: "Lỗi khi thêm sản phẩm",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // Upload images based on product_id
  const AddImageHandle = async (productId: number) => {
    if (!productId) {
      console.error("Product ID is undefined or invalid");
      return;
    }

    if (images.length === 0) {
      Swal.fire({
        title: "Thông báo!",
        text: "Vui lòng tải lên ít nhất một hình ảnh.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const formData = new FormData();
    formData.append("product_id", productId.toString());
    images.forEach((image) => {
      formData.append("images[]", image);
    });

    try {
      const res = await fetch(`/api/Image`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        props.reloadData();
        setImages([]);
        withReactContent(Swal).fire({
          title: "Thông báo!",
          text: "Thêm hình ảnh thành công!",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        throw new Error("Failed to upload images");
      }
    } catch (error) {
      withReactContent(Swal).fire({
        title: "Thông báo!",
        text: "Đã xảy ra lỗi khi tải hình ảnh.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={props.closeHanle}
      contentLabel="Thêm Sản Phẩm"
      className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-3/5 overflow-y-auto max-h-screen"
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-50"
    >
      <h2 className="text-xl font-bold">Thêm Sản Phẩm Mới</h2>
      <form className="mt-3" onSubmit={AddProductHandle}>
        {/* Tên Sản Phẩm */}
        <div className="mb-4">
          <label className="block text-gray-700">Tên Sản Phẩm</label>
          <input
            type="text"
            value={product_name}
            onChange={(e) => setProductName(e.target.value)}
            className="p-2 rounded-lg border-solid border-2 w-full"
            required
          />
        </div>

        {/* Mô Tả */}
        <div className="mb-4">
          <label className="block text-gray-700">Mô Tả</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 rounded-lg border-solid border-2 w-full"
            required
          />
        </div>

        {/* Giá */}
        <div className="mb-4">
          <label className="block text-gray-700">Giá</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="p-2 rounded-lg border-solid border-2 w-full"
            required
          />
        </div>

        {/* Số Lượng Tồn Kho */}
        <div className="mb-4">
          <label className="block text-gray-700">Số Lượng Tồn Kho</label>
          <input
            type="text"
            value={stock_quantity}
            onChange={(e) => setStockQuantity(Number(e.target.value))}
            className="p-2 rounded-lg border-solid border-2 w-full"
            required
          />
        </div>

        {/* Màu */}
        <div className="mb-4">
          <label className="block text-gray-700">Màu</label>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="p-2 rounded-lg border-solid border-2 w-full"
            required
          />
        </div>

        {/* Danh Mục */}
        <div className="mb-4">
          <label className="block text-gray-700">Danh Mục</label>
          <select
            value={category_id ?? ""}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className="p-2 rounded-lg border-solid border-2 w-full"
            required
          >
            <option value="">Chọn danh mục</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        {/* Thương Hiệu */}
        <div className="mb-4">
          <label className="block text-gray-700">Thương Hiệu</label>
          <select
            value={brand_id ?? ""}
            onChange={(e) => setBrandId(Number(e.target.value))}
            className="p-2 rounded-lg border-solid border-2 w-full"
            required
          >
            <option value="">Chọn thương hiệu</option>
            {brands.map((brand) => (
              <option key={brand.brand_id} value={brand.brand_id}>
                {brand.brand_name}
              </option>
            ))}
          </select>
        </div>

        {/* Mùa */}
        <div className="mb-4">
          <label className="block text-gray-700">Mùa</label>
          <select
            value={season_id ?? ""}
            onChange={(e) => setSeasonId(Number(e.target.value))}
            className="p-2 rounded-lg border-solid border-2 w-full"
            required
          >
            <option value="">Chọn mùa</option>
            {seasons.map((season) => (
              <option key={season.season_id} value={season.season_id}>
                {season.season_name}
              </option>
            ))}
          </select>
        </div>

        {/* Tải Lên Hình Ảnh */}
        <div className="mb-4">
          <label className="block text-gray-700">Tải Lên Hình Ảnh</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            multiple
            className="w-full p-2 border rounded-lg"
          />
          <div className="flex flex-wrap mt-2">
            {images.map((image, index) => (
              <div key={index} className="relative mr-2 mb-2">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Hình ảnh"
                  className="w-32 h-32 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Thêm Sản Phẩm
          </button>
          <button
            type="button"
            onClick={props.closeHanle}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg ml-2"
          >
            Hủy
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddProduct;
