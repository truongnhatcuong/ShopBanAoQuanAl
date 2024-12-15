"use client";
import React, { useEffect, useState } from "react";
import Title from "./Title";
import ProductItemSeller from "./ProductItemSeller";

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
const ProductSeller = () => {
  const [promotion, setPromotion] = useState<IPromotion[]>([]);
  async function ProductSeller() {
    const res = await fetch("/api/promotion");
    if (res.ok) {
      const data = await res.json();
      setPromotion(data.promotions);
    }
  }
  useEffect(() => {
    ProductSeller();
  }, []);
  return (
    <div className="my-16  block1">
      <div className="text-center text-2xl text">
        <Title title1="Sản Phẩm" title2="Khuyến Mãi" />
        <p className="text-xs mx-16 sm:text-sm md:text-base hidden sm:block">
          Hiện nay, khuyến mại đồng giá các sản phẩm đang được các chủ shop áp
          dụng nhiều nhất trong các chương trình khuyến mại. Kiểu khuyến mại này
          tạo ra cảm giác thích thú và an tâm hơn khi mua hàng, từ đó kích thích
          khách hàng mua nhiều mặt hàng hơn.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 ">
        {promotion.slice(0, 5).map((item, index) => (
          <ProductItemSeller props={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductSeller;
