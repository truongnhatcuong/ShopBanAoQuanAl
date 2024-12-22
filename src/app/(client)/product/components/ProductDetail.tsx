/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";
import { assets } from "@/app/assets/frontend_assets/assets";
import React, { useState } from "react";
import AddToCart from "../../cart/components/Addcart";
import RelatedProduct from "../../components/RelatedProduct";

interface Size {
  stock_quantity: number;
  Size: {
    size_id: number;
    name_size: string;
  };
}

interface IProduct {
  product_id: number;
  product_name: string;
  description: string;
  price: string;
  stock_quantity: number;
  color: string;
  Category: { category_name: string };
  Images: { image_url: string }[];
  ProductSizes: Size[];
  sizes: { size_id: number; name_size: string; stock_quantity: number }[];
}

interface IProps {
  productDetail: IProduct | null;
}

const ProductDetail = ({ productDetail }: IProps) => {
  if (!productDetail) {
    return (
      <p className="text-center">
        <span className="loading loading-dots loading-lg"></span>
      </p>
    );
  }
  console.log("Category Name:", productDetail.Category.category_name);

  const [size, setSize] = useState("");
  const [sizeId, setSizeId] = useState<number | null>(null);

  const [selectImage, setSelectImage] = useState<string | null>(
    productDetail.Images[0]?.image_url || null
  );
  const handleSizeSelect = (selectedSize: string, size_id: number) => {
    setSize(selectedSize);
    setSizeId(size_id); // Lưu lại size_id khi chọn một kích thước
  };
  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500">
      {/* product data */}
      <div className="flex flex-col sm:flex-row gap-12 sm:gap-12">
        {/* product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productDetail.Images.map((item, index) => (
              <img
                src={item.image_url}
                alt=""
                key={index}
                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-lg transition-transform duration-200 ease-in-out hover:scale-110 ${
                  selectImage === item.image_url ? "border border-gray-900" : ""
                }`}
                onClick={() => setSelectImage(item.image_url)}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              src={selectImage || productDetail.Images[0]?.image_url}
              alt=""
              key={selectImage}
              className="w-full h-auto rounded-lg transition-transform duration-300 ease-in-out "
            />
          </div>
        </div>
        {/* thong tin product */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2 uppercase">
            {productDetail.product_name}
          </h1>
          <div className="flex items-center gap-1 mt-2 ">
            <img src={assets.star_icon.src} alt="" className="w-3" />
            <img src={assets.star_icon.src} alt="" className="w-3" />
            <img src={assets.star_icon.src} alt="" className="w-3" />
            <img src={assets.star_icon.src} alt="" className="w-3" />
            <img src={assets.star_icon.src} alt="" className="w-3" />
            <p className="pl-2 text-base">({productDetail.stock_quantity})</p>
          </div>
          <p className="text-xl mt-2 font-medium">
            <span>
              {parseInt(productDetail.price)
                .toLocaleString("vi-VN")
                .replace(/\./g, ",")}
            </span>
            đ
          </p>
          <p className="mt-5 text-gray-500 dark:text-gray-100 text-sm md:w-4/5">
            {productDetail.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Chọn Size</p>
            <div className="flex gap-7">
              {productDetail?.ProductSizes.map((item) => (
                <div
                  onClick={() =>
                    handleSizeSelect(item.Size.name_size, item.Size.size_id)
                  }
                  key={item.Size.size_id}
                  title={`Số Lượng size  ${item.stock_quantity} `}
                  className={`border py-2 px-3.5  bg-slate-100 dark:bg-gray-900 dark:text-gray-50 cursor-pointer ${
                    item.Size.name_size === size ? " border border-black " : ""
                  }`}
                >
                  {item.Size.name_size}
                </div>
              ))}
            </div>
          </div>
          {/* Thêm nút để thêm vào giỏ hàng */}
          <AddToCart
            product={productDetail}
            selectedSizeId={sizeId}
            stockQuantity={
              productDetail?.ProductSizes.find(
                (item) => item.Size.size_id === sizeId
              )?.stock_quantity || 0
            }
          />
          <hr className="mt-8 sm:w-4/5 " />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>Sản phẩm sale không hỗ trợ đổi - trả.</p>
            <p>Sản phẩm nguyên giá được đổi trong 3 ngày.</p>
            <p>Sản phẩm còn đủ tem mác, chưa qua sử dụng.</p>
            <p> Sản phẩm được đổi 1 lần duy nhất, không hỗ trợ trả.</p>
          </div>
        </div>
      </div>
      <div>
        <RelatedProduct category_name={productDetail.Category.category_name} />
      </div>
    </div>
  );
};

export default ProductDetail;
