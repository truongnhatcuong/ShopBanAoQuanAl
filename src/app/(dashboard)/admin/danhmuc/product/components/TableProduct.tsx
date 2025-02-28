/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import UpdateProduct from "./UpdateProduct";
import DeleteProduct from "./DeleteProduct";
import { ForMatPrice } from "@/lib/FormPrice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  searchTerm: string;
  sortOrder: string;
  setSortOrder: (value: string) => void;
}

const TableProduct = (props: ITable) => {
  const [showAllImages, setShowAllImages] = useState<number | null>(null);

  const toggleShowAllImages = (id: number) => {
    setShowAllImages(showAllImages === id ? null : id);
  };

  return (
    <Table className="w-full table-auto bg-white shadow-md rounded-lg ">
      <TableHeader className="p-5 text-white ">
        <TableRow className="bg-gray-950   border-b border-gray-300  ">
          <TableHead className="px-4 py-2 flex items-center gap-2">
            <div>Tên sản phẩm</div>
            <div
              className="cursor-pointer"
              onClick={() =>
                props.setSortOrder(props.sortOrder === "asc" ? "desc" : "asc")
              }
            >
              {props.sortOrder === "asc" ? (
                <p className="text-lg">↓</p>
              ) : (
                <p className="text-lg">↑</p>
              )}
            </div>
          </TableHead>
          <TableHead className=" py-2 pl-10">Giá</TableHead>
          <TableHead className="px-4 py-2">Tổng số lượng</TableHead>
          <TableHead className="px-4 py-2 hidden md:block ml-3">
            Kích Thước
          </TableHead>
          <TableHead className="pl-10 py-2 ">Hình ảnh</TableHead>
          <TableHead className="px-4 py-2">Hành động</TableHead>
        </TableRow>
      </TableHeader>
      {props.productData.length ? (
        <TableBody>
          {props.productData.map((product, index) => (
            <TableRow
              key={product.product_id}
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300"
            >
              <TableCell className="px-4 py-2">
                {product.product_name}
              </TableCell>
              <TableCell className="px-4 py-2 text-lg font-semibold text-gray-800">
                {ForMatPrice(product.price)}
              </TableCell>
              <TableCell className="px-4 py-2 text-center">
                {product.stock_quantity} số lượng
              </TableCell>
              <TableCell className="px-4 py-2 hidden md:block ">
                <div className="flex gap-1 mt-6">
                  {product.ProductSizes.map((size, index) => (
                    <p
                      key={index}
                      className="border border-gray-700 py-1 px-2 hover:bg-slate-200"
                      title={`số lượng còn ${size.stock_quantity} `}
                    >
                      {size.Size?.name_size}
                    </p>
                  ))}
                </div>
              </TableCell>
              <TableCell className="px-4 py-2 relative">
                <div className="flex items-center justify-center  ">
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
              </TableCell>
              <TableCell className="px-4 py-2 text-center">
                <div className="flex space-x-4 ">
                  <DeleteProduct
                    product_id={product.product_id}
                    reloadData={props.reloadData}
                  />
                  {!showAllImages && (
                    <UpdateProduct {...product} reloadData={props.reloadData} />
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <TableBody className="mt-5">
          <TableRow>
            <TableCell colSpan={6} className="text-center ">
              không tìm thấy sản phẩm có tên này{" "}
              <span className="text-2xl text-red-600 font-semibold">
                {props.searchTerm}
              </span>
            </TableCell>
          </TableRow>
        </TableBody>
      )}
    </Table>
  );
};

export default TableProduct;
