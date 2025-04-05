/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductDetail from "../components/ProductDetail";
import Aos from "aos";
import { trackUserAction } from "@/lib/trackUserAction";

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
    seller_response: string;
    review_date: string;
    Customer: { name: string; image: string };
  }[];
}

const Page = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  const params = useParams();
  const [productDetail, setProductDetail] = useState<IProduct | null>(null);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [countReview, setCountReview] = useState(0);

  const id = params.id;

  useEffect(() => {
    async function ApiProductDeTail() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`
      );
      const data = await res.json();
      await trackUserAction(Number(id), "view");
      setProductDetail(data.getProduct);
      setOriginalPrice(data.originalPrice);
      setCountReview(data.countReview);
    }
    ApiProductDeTail();
  }, [id]);

  console.log("productDetail", productDetail);

  return (
    <>
      <ProductDetail
        productDetail={productDetail}
        originalPrice={originalPrice}
        countReview={countReview}
      />
    </>
  );
};

export default Page;
