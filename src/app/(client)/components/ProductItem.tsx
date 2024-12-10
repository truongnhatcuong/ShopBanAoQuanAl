/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

interface IProduct {
  product_id: number;
  product_name: string;
  price: number;
  Images: { image_url: string | any }[];
}

const ProductItem = ({ product_id, Images, price, product_name }: IProduct) => {
  return (
    <div title={`sản phẩm ${product_name} `}>
      <Link
        href={`/product/${product_id}`}
        className="text-gray-700 cursor-pointer "
      >
        <div className="overflow-hidden mt-5">
          <img
            src={Images[0]?.image_url || null}
            alt=""
            className="hover:scale-110 transition ease-in-out object-cover w-full h-full  sm:w-52 sm:h-52 "
          />
          <p className="pt-3 pb-1 text-base">{product_name}</p>
          <p className="text-sm font-medium ">
            {Number(price).toLocaleString("vi-VN").replace(/\./g, ",")}đ
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
