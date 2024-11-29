/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

interface IProduct {
  product_id: number;
  product_name: string;
  price: string;
  Images: { image_url: string | any }[];
}

const ProductItem = ({ product_id, Images, price, product_name }: IProduct) => {
  return (
    <div>
      <Link
        href={`/product/${product_id}`}
        className="text-gray-700 cursor-pointer "
      >
        <div className="overflow-hidden mt-8">
          <img
            src={Images[0]?.image_url || null}
            alt=""
            className="hover:scale-110 transition ease-in-out w-52 h-56 "
          />
          <p className="pt-3 pb-1 text-sm">{product_name}</p>
          <p className="text-sm font-medium ">{price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
