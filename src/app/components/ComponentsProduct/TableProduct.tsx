/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import DeleteProduct from "./DeleteProduct";
import UpdateImage from "../componentsImageProduct/UpdateImage";
import DeleteImage from "../componentsImageProduct/DeleteImage";
import { FaPen } from "react-icons/fa";
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

interface IImage {
  image_id: number;
  product_id: number;
  image_url: string;
}

interface ITableProduct {
  product: IProduct[];
  closeHandle: (product: IProduct) => void;
}

const TableProduct = ({ product, closeHandle }: ITableProduct) => {
  const [productList, setProductList] = useState<IProduct[]>(product);
  const [images, setImages] = useState<{ [key: number]: IImage[] }>({});
  const [showImages, setShowImages] = useState<number | null>(null);
  const [imageToUpdate, setImageToUpdate] = useState<IImage | null>(null);

  useEffect(() => {
    if (product && product.length > 0) {
      setProductList(product);
    }
  }, [product]);

  const fetchImages = async (productId: number) => {
    try {
      const imageRes = await fetch(`/api/Image/${productId}`);
      if (!imageRes.ok) {
        throw new Error("Lỗi khi tải hình ảnh");
      }
      const imageData = await imageRes.json();
      setImages((prev) => ({
        ...prev,
        [productId]: imageData.images || [],
      }));
    } catch (error) {
      console.error("Lỗi tải hình ảnh:", error);
    }
  };

  const toggleShowImages = (productId: number) => {
    if (!images[productId]) {
      fetchImages(productId);
    }
    setShowImages(showImages === productId ? null : productId);
  };

  const reloadData = () => {
    setImageToUpdate(null);
    if (showImages !== null) {
      fetchImages(showImages);
    }
  };

  const deleteImage = (image_id: number) => {
    setImages((prevImages) => {
      if (showImages !== null) {
        return {
          ...prevImages,
          [showImages]:
            prevImages[showImages]?.filter(
              (img) => img.image_id !== image_id
            ) || [],
        };
      }
      return prevImages;
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>Show Images</th>

              <th className="text-center">Product Name</th>

              <th className="text-center">Price</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Color</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {productList.length > 0 ? (
              productList.map((item) => (
                <React.Fragment key={item.product_id}>
                  <tr className="text-center">
                    <td>
                      <button
                        className="bg-gray-200 p-1 rounded-md hover:bg-gray-300"
                        onClick={() => toggleShowImages(item.product_id)}
                      >
                        {showImages === item.product_id ? "◄ " : "►"}
                      </button>
                    </td>

                    <td>{item.product_name}</td>
                    <td>{item.price}</td>
                    <td>{item.stock_quantity}</td>
                    <td>{item.color}</td>
                    <td className="space-x-3 flex justify-center">
                      <button
                        className="text-blue-500 p-1 rounded-md hover:text-blue-600  text-2xl"
                        onClick={() => closeHandle(item)}
                      >
                        <FaPen />
                      </button>
                      <DeleteProduct
                        DeleteHandle={(product_id) =>
                          setProductList((prev) =>
                            prev.filter(
                              (item) => item.product_id !== product_id
                            )
                          )
                        }
                        product_id={item.product_id}
                      />
                    </td>
                  </tr>

                  {/* Hiển thị hình ảnh ngay dưới sản phẩm nếu showImages trùng product_id */}
                  {showImages === item.product_id && (
                    <tr>
                      <td colSpan={8}>
                        <div className="mt-4 flex flex-wrap justify-around">
                          {images[item.product_id]?.map((img) => (
                            <div
                              key={img.image_id}
                              className="mb-2 flex items-center flex-col"
                            >
                              <img
                                src={img.image_url}
                                alt={`Image ${img.image_id}`}
                                className="object-cover w-32 h-32"
                                onError={() =>
                                  console.error(
                                    `Failed to load image: ${img.image_url}`
                                  )
                                }
                              />
                              <div className="flex mt-2 space-x-3">
                                <DeleteImage
                                  image={img}
                                  DeleteImageAction={deleteImage}
                                />
                                <button
                                  className="bg-blue-500 p-1 rounded-md hover:bg-blue-600 text-white"
                                  onClick={() => setImageToUpdate(img)}
                                >
                                  Update
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center">
                  Không có sản phẩm nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {imageToUpdate && (
        <UpdateImage
          image={imageToUpdate}
          closeHandle={() => setImageToUpdate(null)}
          reloadData={reloadData}
        />
      )}
    </div>
  );
};

export default TableProduct;
