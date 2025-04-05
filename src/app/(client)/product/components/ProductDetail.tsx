/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import AddToCart from "../../cart/components/Addcart";
import RelatedProduct from "./RelatedProduct";
import TextCompact from "./TextCompact";
import { ForMatPrice } from "@/lib/FormPrice";
import ReViewProduct from "./ReViewProduct";
import Image from "next/image";

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
    Customer: { name: string; image: string };
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
    <div className="border-t-2 border-gray-200 pt-12 transition-opacity ease-in duration-500">
      {/* Product Data */}
      <div className="flex flex-col sm:flex-row gap-12 sm:gap-16 max-w-7xl mx-auto">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-4 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal sm:w-[18.7%] w-full gap-2 sm:gap-4">
            {productDetail.Images.map((item, index) => (
              <Image
                width={400}
                height={400}
                src={item.image_url}
                alt={`Thumbnail ${index + 1}`}
                key={index}
                className={`w-[29%] h-24 sm:w-full sm:h-28 flex-shrink-0 cursor-pointer  transition-all duration-200 ease-in-out ${
                  selectImage === item.image_url
                    ? "border-2 border-indigo-500 scale-105"
                    : "border border-gray-200"
                }`}
                onClick={() => setSelectImage(item.image_url)}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <Image
              width={200}
              height={200}
              src={selectImage || productDetail.Images[0]?.image_url}
              alt={productDetail.product_name}
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              key={selectImage}
              className="w-full h-auto rounded-xl shadow-lg hover:scale-[1.02] transition-transform duration-300 ease-in-out"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1  ml-7 md:ml-0">
          <h1 className="font-semibold text-3xl mt-2 uppercase text-gray-800 dark:text-gray-100 tracking-wide">
            {productDetail.product_name.toUpperCase()}
          </h1>
          <div className="flex items-center gap-2 mt-3">
            <div className="rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <input
                  key={star}
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-yellow-400 h-5 transition-all ease-out duration-300"
                  value={star}
                  checked={
                    productDetail.Review.length > 0 &&
                    star === productDetail.Review[0].rating
                  }
                  disabled
                />
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              ({productDetail.stock_quantity} sản phẩm)
            </p>
          </div>
          <p className="text-2xl my-4 font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-4">
            <span>{ForMatPrice(Number(productDetail.price))}</span>
            {originalPrice > 0 && (
              <span className="line-through text-red-500 text-lg">
                {ForMatPrice(originalPrice)}
              </span>
            )}
          </p>
          <div className="mt-4 text-gray-600 dark:text-gray-300 text-base md:w-4/5 leading-relaxed">
            <TextCompact>{productDetail.description}</TextCompact>
          </div>

          {/* Size Selection */}
          <div className="flex flex-col gap-4 my-8">
            <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
              Chọn Size
            </p>
            <div className="flex gap-4 flex-wrap">
              {productDetail?.ProductSizes.map((item) => (
                <div
                  onClick={() => handleSizeSelect(item.Size.size_id)}
                  key={item.Size.size_id}
                  title={`Số lượng size: ${item.stock_quantity}`}
                  className={`border-2 py-2 px-4 bg-white dark:bg-gray-800 dark:text-gray-100 cursor-pointer rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ${
                    item.Size.size_id === sizeId
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900"
                      : "border-gray-200"
                  }`}
                >
                  {item.Size.name_size}
                </div>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <AddToCart
            product={productDetail}
            selectedSizeId={sizeId}
            stockQuantity={
              productDetail?.ProductSizes.find(
                (item) => item.Size.size_id === sizeId
              )?.stock_quantity || 0
            }
          />
          <hr className="mt-8 sm:w-4/5 border-gray-200" />
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-5 flex flex-col gap-2">
            <p>Sản phẩm sale không hỗ trợ đổi - trả.</p>
            <p>Sản phẩm nguyên giá được đổi trong 3 ngày.</p>
            <p>Sản phẩm còn đủ tem mác, chưa qua sử dụng.</p>
            <p>Sản phẩm được đổi 1 lần duy nhất, không hỗ trợ trả.</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <RelatedProduct
          category_name={productDetail.Category.category_name}
          currentProductId={productDetail.product_id}
        />
      </div>

      {/* Reviews */}
      <div className="my-10 max-w-7xl mx-auto">
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
          <div className="p-6 pb-10 border border-gray-200 rounded-xl shadow-sm bg-white dark:bg-gray-800">
            <h1 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Đánh Giá Sản Phẩm
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Chưa có bất kỳ đánh giá nào!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
