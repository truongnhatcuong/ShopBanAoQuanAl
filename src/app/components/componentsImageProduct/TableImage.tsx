/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import DeleteImage from "./DeleteImage";

interface IImage {
  image_id: number;
  product_id: number;
  image_url: string;
}

interface ITable {
  image: IImage[];
  closeHandle: (image: IImage) => void;
}

interface IProduct {
  product_id: number;
  product_name: string;
}

const TableImage = ({ image, closeHandle }: ITable) => {
  const [products, setProduct] = useState<IProduct[]>([]);
  const [imagelist, Setimagelist] = useState<IImage[]>(image); // Nên định nghĩa kiểu cho state này

  async function ApiProduct() {
    try {
      const productRes = await fetch(`/api/product`, { cache: "no-cache" });
      const productData = await productRes.json();
      setProduct(productData.Product);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    }
  }

  useEffect(() => {
    ApiProduct();
    Setimagelist(image);
  }, [image]);

  function DeleteImageHandle(image_id: number) {
    Setimagelist(imagelist.filter((item) => item.image_id !== image_id)); // Thêm return vào đây
  }

  const getNameProduct = (product_id: number) => {
    const product = products.find((prd) => prd.product_id === product_id);
    return product?.product_name || "Không tìm thấy sản phẩm"; // Hiển thị thông báo nếu không tìm thấy
  };

  const groupedImages = imagelist.reduce(
    (total: { [key: number]: IImage[] }, image) => {
      if (!total[image.product_id]) {
        total[image.product_id] = [];
      }
      total[image.product_id].push(image);
      return total;
    },
    {}
  );

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th className="">ID</th>
            <th>Tên sản phẩm</th>
            <th>Hình ảnh</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedImages).map((productId) => (
            <tr key={productId}>
              <th>{productId}</th>
              <td>{getNameProduct(Number(productId))}</td>
              <td className="flex space-x-7">
                {groupedImages[Number(productId)].map((img) => (
                  <img
                    key={img.image_id}
                    src={img.image_url}
                    alt={"Không tìm thấy hình ảnh"}
                    width={60}
                    height={50}
                    className="object-cover"
                  />
                ))}
              </td>
              <td className="flex space-x-4">
                {groupedImages[Number(productId)].map((img) => (
                  <div key={img.image_id} className="flex flex-col ">
                    <DeleteImage
                      DeleteImageAction={DeleteImageHandle}
                      image={img}
                    />
                    <button
                      className="p-1 text-white bg-blue-500 hover:bg-blue-600 rounded-md font-bold flex items-center mt-3"
                      onClick={() => closeHandle(img)}
                    >
                      Cập nhật
                    </button>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableImage;
