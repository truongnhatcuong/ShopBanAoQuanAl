"use client";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import FilterSidebar from "./components/SideBar";
import SelectForm from "./components/SelectForm";
import ProductCard from "./components/ProductCard";

const PageProduct = () => {
  const searchParams = useSearchParams();
  const category_Id = searchParams.get("category_id");

  const [product, setProduct] = useState<any[]>([]);

  // Hàm gọi API
  useEffect(() => {
    async function fetchProducts() {
      const endpoint = category_Id
        ? `/api/categories/${category_Id}`
        : `/api/product`;
      try {
        const req = await fetch(endpoint);
        const data = await req.json();
        if (category_Id) {
          if (data.category?.Products && data.category.Products.length > 0) {
            setProduct(data.category.Products);
          } else {
            setProduct([]);
          }
        } else {
          setProduct(data.Product || []);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    }
    fetchProducts();
  }, [category_Id]);
  console.log(product);

  return (
    <div className="flex  h-screen">
      {/* Sidebar */}
      <div className="w-[220px] bg-zinc-50 shadow-lg h-[160%] hidden md:block">
        <FilterSidebar
          onCategoryChange={(categoryId) => console.log(categoryId)} // Cập nhật khi thay đổi danh mục
        />
      </div>

      {/* Giữa các phần: sidebar và nội dung */}
      <div className="flex-1 ">
        {/* Select Form bên trái */}
        <div className="flex justify-end mr-12  ">
          <SelectForm />
        </div>

        {/* Content area */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 gap-4 gap-y-6 ">
          <ProductCard ProductValue={product} />
        </div>
      </div>
    </div>
  );
};

export default function SuspenseWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageProduct />
    </Suspense>
  );
}
