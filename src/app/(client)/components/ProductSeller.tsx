"use client";
import React, { useEffect, useState } from "react";
import Title from "./Title";
import ProductItemSeller from "./ProductItemSeller";
import Image from "next/image";

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
  const [numberslice, setNumberSlice] = useState(5);
  async function ProductSeller() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/promotion`);
    if (res.ok) {
      const data = await res.json();
      setPromotion(data.promotions);
    }
  }
  useEffect(() => {
    ProductSeller();
  }, []);
  return (
    <div className="my-8 ">
      <div className="flex items-center justify-center mx-4">
        <Image src={"/Image/sale.png"} alt="" width={1400} height={400} />
      </div>
      <p className="text-sm text-center mt-2 text-muted-foreground ">
        Những Sản Phẩm Khuyến Mãi Phổ Biến
      </p>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 "
        data-aos-duration="1600"
        data-aos-easing="ease-in-out"
        data-aos="zoom-in"
      >
        {promotion.slice(0, numberslice).map((item, index) => (
          <ProductItemSeller props={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductSeller;
