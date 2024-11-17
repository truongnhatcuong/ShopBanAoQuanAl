/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
interface IProduct {
  product_id: number;
  product_name: string;
  description: string;
  price: number;
  stock_quantity: number;
  Images: { image_url: string }[];
  color: string;
}

interface ProductListProps {
  ProductValue: IProduct[];
}

const ProductCard = ({ ProductValue }: ProductListProps) => {
  return (
    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 max-w-6xl mx-auto py-4 gap-4  space-x-10 ">
      {ProductValue.map((item) => (
        <Link href={`/product/${item.product_id}`} key={item.product_id}>
          <div className="card bg-base-100 w-60 h-80  shadow-xl">
            <figure>
              {item.Images && item.Images.length > 0 ? (
                <img
                  src={item.Images[0].image_url}
                  alt={item.product_name}
                  className="w-full h-36 object-cover"
                />
              ) : (
                <p>Không có hình ảnh</p>
              )}
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.product_name}</h2>
              <p className="badge badge-secondary">
                {item.stock_quantity} sản phẩm có sẵn
              </p>
              <div className="card-actions justify-end mt-5">
                <div className="badge badge-outline"> Giỏ Hàng</div>
                <div className="badge badge-outline">Mua Ngay</div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductCard;
