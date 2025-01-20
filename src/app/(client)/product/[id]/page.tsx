"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductDetail from "../components/ProductDetail";
import Aos from "aos";

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

const Page = () => {
  useEffect(() => {
    Aos.init();
  }, []);
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

  return (
    <div>
      <div className="">
        <ProductDetail productDetail={productDetail} />
      </div>
    </div>
  );
};

export default Page;
