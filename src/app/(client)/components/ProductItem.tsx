/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

interface IProduct {
  product_id: number;
  product_name: string;
  price: number;
  Images: { image_url: string | any }[];
  ProductPromotion?: { Promotion: { discount: number } }[];
}

const ProductItem = ({
  product_id,
  Images,
  price,
  product_name,
  ProductPromotion,
}: IProduct) => {
  return (
    <div
      title={`sản phẩm ${product_name} `}
      className="flex flex-col items-center text-center md:text-start"
    >
      <Link
        href={`/product/${product_id}`}
        className="text-gray-800 dark:text-white cursor-pointer  "
      >
        <div className="overflow-hidden mt-5 relative  group">
          <img
            src={Images[0]?.image_url || null}
            alt=""
            className="object-cover w-full h-full md:w-56 md:h-52 transition-all duration-400 ease-in-out opacity-100 group-hover:opacity-0"
          />
          {Images[1] && (
            <img
              src={Images[1].image_url}
              alt=""
              className="absolute top-0 left-0 object-cover w-full h-full md:w-56 md:h-52 transition-all ease-in-out opacity-0 group-hover:opacity-100 duration-700"
            />
          )}
          {ProductPromotion && ProductPromotion[0]?.Promotion.discount ? (
            <p className="absolute top-0 left-0 px-0.5 py-1 bg-red-600 text-sm font-bold rounded-bl-md text-white">
              -{ProductPromotion[0]?.Promotion.discount}%
            </p>
          ) : null}
          <p className="mt-3 pb-1 text-base ">{product_name}</p>
          <p className="text-sm font-medium ">
            {Number(price).toLocaleString("vi-VN").replace(/\./g, ",")}đ
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
