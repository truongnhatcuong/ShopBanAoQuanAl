/* eslint-disable @next/next/no-img-element */
import { ForMatPrice } from "@/lib/FormPrice";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface IPromotion {
  discount: number;
  products: {
    product_id: number;
    product_name: string;
    current_price: number;
    original_price: number;
    images: { image_url: string }[];
  }[];
}
interface IProps {
  props: IPromotion;
}

const ProductItemSeller = ({ props }: IProps) => {
  return (
    <div title={`sản phẩm ${props.products[0].product_name}`} className="image">
      <Link
        href={`/product/${props.products[0].product_id}`}
        className=" cursor-pointer  "
      >
        <div className="relative overflow-hidden mt-5 ">
          {/* giảm giá */}
          <div className="absolute top-0 left-0 bg-red-500 text-white text-sm font-bold px-0.5 py-1 rounded-bl-lg z-20 ">
            -{props.discount}%
          </div>
          <div className="relative group">
            <Image
              width={200}
              height={200}
              src={props.products[0].images[0].image_url}
              alt=""
              className="hover:scale-110 transition-all ease-in-out object-cover w-96 h-80  md:w-52 md:h-52 opacity-100 group-hover:opacity-0"
            />
            {props.products[0].images[1].image_url && (
              <Image
                width={200}
                height={200}
                src={props.products[0].images[1].image_url}
                alt=""
                className="hover:scale-110 transition-all ease-in-out object-cover w-96 h-80  md:w-52 md:h-52 absolute top-0 opacity-0 group-hover:opacity-100 duration-700"
              />
            )}
          </div>
          <p className="pt-3 pb-1 text-base">
            {props.products[0].product_name}
          </p>
          <div className="flex gap-4">
            <b className="text-base font-bold ">
              {ForMatPrice(Number(props.products[0].current_price))}
            </b>
            <p className="text-base  text-red-600 font-bold ml-2 line-through ">
              {ForMatPrice(Number(props.products[0].original_price))}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductItemSeller;
