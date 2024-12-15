/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { log } from "console";

interface Product {
  product_id: number;
  product_name: string;
  price: number;
  Images: { image_url: string | any }[];
  Category: { category_name: string };
  // Các thuộc tính khác nếu cần
}
const RelatedProduct = ({ category_name }: { category_name: string }) => {
  const [relate, setRelate] = useState<Product[]>([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ApiProductForCategories = async () => {
    const res = await fetch("/api/product");
    const data = await res.json();

    const filterCategory = data.product.filter(
      (item: any) => item.Category.category_name === category_name
    );
    setRelate(filterCategory.slice(0, 5));
  };

  useEffect(() => {
    if (category_name) {
      ApiProductForCategories();
    }
  }, [category_name]);

  return (
    <div>
      <div className="text-2xl text-center mt-7 mb-3">
        <Title title1="Sản Phẩm" title2="Liên Quan" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-6 ">
        {relate.length > 0 ? (
          relate.map((item) => <ProductItem {...item} key={item.product_id} />)
        ) : (
          <p className="text-gray-500">Không có sản phẩm liên quan.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedProduct;
