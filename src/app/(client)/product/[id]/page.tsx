"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductDetail from "../components/ProductDetail";

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
}

const Page = () => {
  const params = useParams();
  const [productDetail, setProductDetail] = useState<IProduct | null>(null); // Chấp nhận null
  const id = params.id;
  useEffect(() => {
    async function ApiProductDeTail() {
      const res = await fetch(`/api/product/${id}`);
      const data = await res.json();
      setProductDetail(data.getProduct);
    }
    ApiProductDeTail();
  }, [id]);

  console.log("api trả về :", productDetail);

  //  api cart

  return (
    <div>
      <div className="">
        <ProductDetail productDetail={productDetail} />
      </div>
    </div>
  );
};

export default Page;
