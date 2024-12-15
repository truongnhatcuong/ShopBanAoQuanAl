/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import UpdateProduct from "./UpdateProduct";
import DeleteProduct from "./DeleteProduct";

interface Product {
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
}

interface ITable {
  productData: Product[];
  reloadData: () => void;
}

const TableProduct = (props: ITable) => {
  const [showAllImages, setShowAllImages] = useState<number | null>(null);

  const toggleShowAllImages = (id: number) => {
    setShowAllImages(showAllImages === id ? null : id);
  };

  return (
    <table className="w-full table-auto bg-white shadow-md rounded-lg ">
      <thead className="p-5">
        <tr className="bg-black text-white text-left border-b border-gray-300 ">
          <th className="px-4 py-2">Tên sản phẩm</th>
          <th className="px-4 py-2">Giá</th>
          <th className="px-4 py-2">Tổng số lượng</th>
          <th className="px-4 py-2">Màu sắc</th>
          <th className="px-4 py-2">Kích thước</th>
          <th className="px-4 py-2">Hình ảnh</th>
          <th className="px-4 py-2">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {props.productData.map((product, index) => (
          <tr
            key={product.product_id}
            className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300"
          >
            <td className="px-4 py-2">{product.product_name}</td>
            <td className="px-4 py-2 text-lg font-semibold text-gray-800">
              {Number(product.price)
                .toLocaleString("vi-VN")
                .replace(/\./g, ",")}
              đ
            </td>
            <td className="px-4 py-2 text-center">{product.stock_quantity}</td>
            <td className="px-4 py-2 text-center">{product.color}</td>
            <td className="px-4 py-2">
              <ul className="flex space-x-2 justify-center">
                {product.ProductSizes.map((size, sizeIndex) => (
                  <li key={sizeIndex} className="mb-1">
                    <span
                      className="border border-gray-500 p-1 hover:bg-gray-300 rounded-md cursor-pointer"
                      title={`Số Lượng: ${size.stock_quantity}`}
                    >
                      {size.Size?.name_size}
                    </span>
                  </li>
                ))}
              </ul>
            </td>
            <td className="px-4 py-2 relative">
              <div className="flex items-center justify-center">
                <img
                  src={product.Images[0]?.image_url}
                  alt={`Hình ảnh sản phẩm ${index}`}
                  className="w-20 h-20 object-cover rounded-md shadow-sm"
                />
                {product.Images.length > 1 && (
                  <button
                    className="ml-2 text-black hover:text-gray-600 focus:outline-none"
                    onClick={() => toggleShowAllImages(product.product_id)}
                  >
                    {showAllImages === product.product_id ? "▲" : "▼"}
                  </button>
                )}
              </div>
              {showAllImages === product.product_id && (
                <div className="absolute z-10  bg-white  mt-2 cursor-pointer w-full">
                  <div className="flex space-x-2 justify-center">
                    {product.Images.map((image, imageIndex) => (
                      <img
                        key={imageIndex}
                        src={image.image_url}
                        alt={`Hình ảnh sản phẩm ${index}-${imageIndex}`}
                        className="w-20 h-20 object-cover border border-gray-700 rounded-md shadow-sm"
                      />
                    ))}
                  </div>
                </div>
              )}
            </td>
            <td className="px-4 py-2 text-center">
              <div className="flex space-x-4 ">
                <DeleteProduct
                  product_id={product.product_id}
                  reloadData={props.reloadData}
                />
                {!showAllImages && (
                  <UpdateProduct {...product} reloadData={props.reloadData} />
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableProduct;
