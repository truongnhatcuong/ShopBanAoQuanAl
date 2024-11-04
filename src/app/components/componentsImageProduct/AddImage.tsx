import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface IAddImage {
  closeHandle: () => void;
  reloadData: () => void;
  selectedProductId?: number; // ID sản phẩm đã chọn
  selectedProductName?: string; // Tên sản phẩm đã chọn
  // Nhận callback
}

const AddImage = ({
  closeHandle,
  reloadData,
  selectedProductId,
  selectedProductName,
}: IAddImage) => {
  const [products, setProducts] = useState<
    { product_id: number; product_name: string }[]
  >([]);
  const [images, setImages] = useState<File[]>([]);

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
      setImages(selectedFiles);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const AddImageHandle = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProductId || images.length === 0) {
      Swal.fire({
        title: "Thông báo!",
        text: "Vui lòng chọn sản phẩm và tải lên ít nhất một hình ảnh.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const formData = new FormData();
    formData.append("product_id", selectedProductId.toString());
    images.forEach((image) => {
      formData.append("images[]", image);
    });

    try {
      const res = await fetch(`/api/Image`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        closeHandle();
        reloadData();
        setImages([]);
        withReactContent(Swal).fire({
          title: "Thông báo!",
          text: "Thêm hình ảnh thành công!",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        throw new Error("Failed to upload");
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
      onRequestClose={closeHandle}
      contentLabel="Thêm Hình Ảnh"
      className="fixed top-[50%] left-[58%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-3/5 max-h-screen overflow-y-auto"
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-50"
    >
      <h2 className="text-xl font-bold">Thêm Hình Ảnh Mới</h2>
      <form className="mt-4" onSubmit={AddImageHandle}>
        <div className="mb-4">
          <label className="block text-gray-700">Tên Sản Phẩm</label>
          <input
            type="text"
            value={selectedProductName || ""}
            className="p-2 rounded-lg border-solid border-2 w-full bg-gray-100"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Chọn Hình Ảnh</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
          <div className="mt-2">
            {images.map((image, index) => (
              <div key={index} className="flex items-center mb-2">
                <span className="text-sm text-gray-500 mr-4">{image.name}</span>
                <button
                  type="button"
                  className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-700"
                  onClick={() => removeImage(index)}
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-5">
          <button
            type="button"
            className="bg-red-500 text-white py-2 px-6 rounded-md  hover:bg-red-700"
            onClick={closeHandle}
          >
            Hủy
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-700"
          >
            Thêm
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddImage;
