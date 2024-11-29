"use client";
import React, { useEffect, useState } from "react";
import Title from "./Title";

import ProductItem from "./ProductItem";

interface IProduct {
  product_id: number;
  product_name: string;
  description: string;
  price: string;

  Images: { image_url: string }[];
}
const ProductSeller = () => {
  const [product, setProduct] = useState<IProduct[]>([]);
  async function ProductSeller() {
    const res = await fetch("/api/product");
    if (res.ok) {
      const data = await res.json();
      setProduct(data);
    }
  }
  useEffect(() => {
    ProductSeller();
  }, []);
  return (
    <div className="my-16 ">
      <div className="text-center text-2xl">
        <Title title1="Sản Phẩm" title2="Khuyến Mãi" />
        <p className="text-xs mx-16 sm:text-sm md:text-base hidden sm:block">
          Hiện nay, khuyến mại đồng giá các sản phẩm đang được các chủ shop áp
          dụng nhiều nhất trong các chương trình khuyến mại. Kiểu khuyến mại này
          tạo ra cảm giác thích thú và an tâm hơn khi mua hàng, từ đó kích thích
          khách hàng mua nhiều mặt hàng hơn.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 ">
        {product.slice(0, 5).map((item) => (
          <ProductItem {...item} key={item.product_id} />
        ))}
      </div>
    </div>
  );
};

export default ProductSeller;
