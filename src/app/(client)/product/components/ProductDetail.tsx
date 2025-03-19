/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";
import { assets } from "@/app/assets/frontend_assets/assets";
import React, { useEffect, useState } from "react";
import AddToCart from "../../cart/components/Addcart";
import RelatedProduct from "../../components/RelatedProduct";
import TextCompact from "./TextCompact";
import { ForMatPrice } from "@/lib/FormPrice";
import ReViewProduct from "./ReViewProduct";

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
  Review: {
    review_id: number;
    comment_review: string;
    image_url: string;
    rating: number;
    review_date: string;
    seller_response: string;
    Customer: { name: string };
  }[];
}

interface IProps {
  productDetail: IProduct | null;
  originalPrice: number;
  countReview: number;
}

const ProductDetail = ({
  productDetail,
  originalPrice,
  countReview,
}: IProps) => {
  if (!productDetail) {
    return (
      <p className="text-center">
        <span className="loading loading-dots loading-lg"></span>
      </p>
    );
  }

  const [sizeId, setSizeId] = useState<number | null>(null);

  const [selectImage, setSelectImage] = useState<string | null>(
    productDetail.Images[0]?.image_url || null
  );
  const handleSizeSelect = (size_id: number) => {
    setSizeId(size_id); // Lưu lại size_id khi chọn một kích thước
  };
  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500">
      {/* product data */}
      <div className="flex flex-col sm:flex-row gap-12 sm:gap-12">
        {/* product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full ">
            {productDetail.Images.map((item, index) => (
              <img
                src={item.image_url}
                alt=""
                key={index}
                className={`w-[29%] h-24 sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-lg mr-1 transition-transform duration-200 ease-in-out  ${
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
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              key={selectImage}
              className="w-full h-auto rounded-lg transition-transform duration-300 ease-in-out "
            />
          </div>
        </div>
        {/* thong tin product */}
        <div className="md:flex-1 flex-none ml-7 md:ml-0 ">
          <h1 className="font-medium text-2xl mt-2 uppercase ">
            {productDetail.product_name}
          </h1>
          <div className="flex items-center gap-1 mt-2 ">
            <div className="rating mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <input
                  key={star}
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-red-600 h-4 transition-all ease-out duration-300"
                  value={star}
                  checked={
                    productDetail.Review.length > 0 &&
                    star === productDetail.Review[0].rating
                  }
                  disabled
                />
              ))}
            </div>
            <p className="pl-2 text-base">({productDetail.stock_quantity})</p>
          </div>
          <p className="text-xl mt-2 font-medium space-x-11">
            <span>{ForMatPrice(parseInt(productDetail.price))}</span>
            <span className="line-through text-red-500">
              {originalPrice > 0 ? ForMatPrice(originalPrice) : ""}
            </span>
          </p>
          <p className="mt-5 text-gray-500 dark:text-gray-100 text-sm md:w-4/5">
            <TextCompact>{productDetail.description}</TextCompact>
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Chọn Size</p>
            <div className="flex gap-7">
              {productDetail?.ProductSizes.map((item) => (
                <div
                  onClick={() => handleSizeSelect(item.Size.size_id)}
                  key={item.Size.size_id}
                  title={`Số Lượng size  ${item.stock_quantity} `}
                  className={`border py-2 px-3.5  bg-slate-100 dark:bg-gray-900 dark:text-gray-50 cursor-pointer ${
                    item.Size.size_id === sizeId ? " border border-black " : ""
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
        <RelatedProduct
          category_name={productDetail.Category.category_name}
          currentProductId={productDetail.product_id}
        />
      </div>
      <div className="my-5">
        {productDetail.Review.length ? (
          <>
            {productDetail.Review.map((item) => (
              <ReViewProduct
                review={item}
                countReview={countReview}
                key={item.image_url}
              />
            ))}
          </>
        ) : (
          <div className="p-6 pb-20 border rounded-lg shadow-sm bg-white">
            <h1 className="text-xl font-semibold mb-4 text-gray-800">
              Đánh Giá Sản Phẩm
            </h1>
            <p className="text-sm text-gray-500">
              chưa có bất kì đánh giá nào !{" "}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
