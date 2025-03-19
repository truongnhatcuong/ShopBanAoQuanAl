/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import FilterSidebar from "./components/SideBar";
import SelectForm from "./components/SelectForm";
import ProductItem from "../components/ProductItem";
import Title from "../components/Title";
import { trackUserAction } from "@/lib/trackUserAction";

interface IProduct {
  product_id: number;
  product_name: string;
  price: number;
  Images: { image_url: string | any }[];
  ProductPromotion?: { Promotion: { discount: number } }[];
}

const PageProduct = () => {
  const searchParams = useSearchParams();
  const category_Id = searchParams.get("category_id");
  const searchQuery = searchParams.get("search") || "";
  const [product, setProduct] = useState<IProduct[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [sortField, setSortField] = useState("price"); // Default sort field
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order

  // Hàm gọi API
  useEffect(() => {
    async function fetchProducts() {
      const endpoint = category_Id
        ? `/api/categories/${category_Id}?sortField=${sortField}&sortOrder=${sortOrder}${
            maxPrice > 0 ? `&maxPrice=${maxPrice}` : ""
          }`
        : `/api/product?search=${searchQuery}&sortField=${sortField}&sortOrder=${sortOrder}${
            maxPrice > 0 ? `&maxPrice=${maxPrice}` : ""
          }`;
      try {
        const req = await fetch(endpoint);
        const data = await req.json();
        if (category_Id) {
          if (data.category?.Products && data.category.Products.length > 0) {
            setProduct(data.category.Products);
            setErrorMessage("");
          } else {
            setProduct([]);
            setErrorMessage("Không có sản phẩm trong danh mục này.");
          }
        } else {
          if (data.product && data.product.length > 0) {
            setProduct(data.product);
            // trackUserAction(1, product[0].product_id, "view");
            setErrorMessage("");
          } else {
            setProduct(data.product || []);
            setErrorMessage("Không tìm thấy sản phẩm với từ khóa này.");
          }
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        setErrorMessage("Có lỗi xảy ra khi lấy sản phẩm.");
      }
    }
    fetchProducts();
  }, [category_Id, maxPrice, searchQuery, sortField, sortOrder]);

  const handleSortChange = (field: string, order: string) => {
    setSortField(field);
    setSortOrder(order);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10  border-t w-full h-full   ">
      {/* Sidebar */}
      <div className="sm:w-1/5 w-full   flex sm:flex-row items-center  flex-col shadow-lg  text-black dark:text-black dark:bg-white ">
        <FilterSidebar
          onCategoryChange={(categoryId) => console.log(categoryId)} // Cập nhật khi thay đổi danh mục
          onPriceChange={(price) => setMaxPrice(price)}
        />
      </div>

      {/* Giữa các phần: sidebar và nội dung */}
      <div className="flex-1 sm:w-4/5 w-full  ">
        {/* Select Form bên trái */}
        <div className="flex  text-lg sm:text-2xl my-2 justify-end md:justify-end ">
          <SelectForm
            onSortChange={handleSortChange}
            sortField={sortField}
            sortOrder={sortOrder}
          />
        </div>{" "}
        <div className="mb-5">
          {" "}
          {searchQuery !== "" && (
            <p className="text-sm text-gray-500 ">
              Liên quan đến: "
              <span className="text-base uppercase text-red-500 font-semibold">
                {searchQuery}
              </span>
              "
            </p>
          )}
        </div>
        <div className="text-center md:my-1.5 my-0">
          <Title title1="Tất Cả" title2="Bộ Sưu Tập" />
        </div>
        {/* Content area */}
        <div className="grid  grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 gap-y-6  md:mx-0">
          {product.length > 0 ? (
            product.map((item) => (
              <ProductItem {...item} key={item.product_id} />
            ))
          ) : (
            <div className="">không tìm thấy sản phẩm </div>
          )}
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
