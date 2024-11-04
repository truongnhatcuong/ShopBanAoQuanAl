import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface IImage {
  image_id: number;
  product_id: number;
  image_url: string;
}

interface IUpdate {
  image: IImage;
  closeHandle: () => void;
  reloadData: () => void;
}

interface IProduct {
  product_id: number;
  product_name: string;
}

const UpdateImage = ({ image, closeHandle, reloadData }: IUpdate) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [product_id, setProduct_id] = useState(image.product_id);
  const [newImage, setNewImage] = useState<File | null>(null);

  async function ApiProduct() {
    const productRes = await fetch(`/api/product`);
    const productData = await productRes.json();
    setProducts(productData.Product);
  }

  useEffect(() => {
    ApiProduct();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).filter((file) =>
        file.type.startsWith("image/")
      );
      setNewImage(selectedFiles[0] || null); // Chỉ lấy một hình ảnh mới
    }
  };

  async function UpdateImage(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image_id", image.image_id.toString()); // Thêm image_id
    formData.append("product_id", product_id.toString());
    if (newImage) {
      formData.append("file", newImage);
    }

    const res = await fetch(`/api/Image/${image.image_id}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);

      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Thông báo!",
        text: "Cập nhật thành công",
        icon: "success",
        confirmButtonText: "OK",
      });
      reloadData();
      closeHandle();
    } else {
      const errorMessage = await res.text(); // Lấy lỗi chi tiết
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Thông báo!",
        text: `Lỗi khi cập nhật: ${errorMessage}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeHandle}
      ariaHideApp={false}
      contentLabel="Cập Nhật Hình Ảnh"
      className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-3/5 max-h-screen overflow-y-auto"
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-50"
    >
      <h2 className="text-xl font-bold">Cập Nhật Hình Ảnh</h2>
      <form className="mt-4" onSubmit={UpdateImage}>
        <div className="mb-4">
          <label className="block text-gray-700">ID</label>
          <input
            type="text"
            value={image.image_id} // Hiển thị ID hình ảnh hiện tại
            className="p-2 rounded-lg border-solid border-2 w-full bg-gray-100"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Chọn sản phẩm</label>
          <select
            value={product_id}
            onChange={(e) => setProduct_id(parseInt(e.target.value))}
            className="p-2 rounded-lg border-solid border-2 w-full"
          >
            <option value="" disabled>
              Chọn sản phẩm
            </option>
            {products.map((item) => (
              <option key={item.product_id} value={item.product_id}>
                {item.product_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Chọn hình ảnh mới (nếu có)
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Cập Nhật
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
  );
};

export default UpdateImage;
