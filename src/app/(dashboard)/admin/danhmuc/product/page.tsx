/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import TableProduct from "./components/TableProduct";
import AddProduct from "./components/Addproduct";
import debounce from "lodash.debounce";
import { Search } from "lucide-react";
import Pagination from "@/app/components/componentsFunction/Pagination";
import { useSearchParams } from "next/navigation";
import SelectPagination from "@/app/components/componentsFunction/SelectPagination";
import SearchParamInput from "@/app/components/componentsFunction/SearchParamInput";
import ExportExcel from "./components/componentChild/ExportExcel";
interface Product {
  product_id: number;
  product_name: string;
  price: number;
  stock_quantity: number;
  color: string;

  description: string;
  category_id: number;
  brand_id: number;
  season_id: number;
  sizes: any[];
  ProductSizes: {
    size_id: number;
    stock_quantity: number;
    Size?: {
      size_id: number;
      name_size: string;
    };
  }[];
  Images: {
    image_id: number;
    image_url: string;
  }[];
}

const PageProduct = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const ApiImage = async () => {
    const res = await fetch("/api/ImageProduct");
    await res.json();
  };

  const [product, setProduct] = useState<Product[] | []>([]);
  const fetchApiProduct = async () => {
    setLoading(true);
    const res = await fetch(
      `/api/product?search=${searchTerm.toLowerCase()}&page=${currentPage}&limit=${limit}&sortOrder=${sortOrder}`,
      { cache: "no-cache" }
    );
    const data = await res.json();
    await ApiImage();
    setLoading(false);
    setCurrentPage(data.pagination.currentPage);
    setTotalPages(data.pagination.totalPages);
    setProduct(data.magamentProducts);
  };

  useEffect(() => {
    fetchApiProduct();
  }, [searchTerm, currentPage, limit, sortOrder]);

  if (loading) {
    <p className="text-gray-500 text-center">Đang tải dữ liệu...</p>;
  }
  return (
    <>
      {/* thêm sản phẩm */}
      <div className="flex justify-between mr-7 ">
        <div className="mt-4">
          <SearchParamInput
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
        <div className="mt-5">
          {" "}
          <ExportExcel product={product} />{" "}
        </div>
        <div>
          {" "}
          <AddProduct reloadData={fetchApiProduct} />
        </div>
      </div>
      {/* danh sách sản phẩm */}
      <div>
        <TableProduct
          setSortOrder={setSortOrder}
          sortOrder={sortOrder}
          searchTerm={searchTerm}
          productData={product}
          reloadData={fetchApiProduct}
        />
      </div>
      {/* phân trang */}
      <div className="flex justify-between">
        <SelectPagination setLimit={setLimit} value={limit} />

        <Pagination
          hasData={currentPage < totalPages}
          currentPage={currentPage}
          onPageChange={(newPage) => setCurrentPage(newPage)}
        />
      </div>
    </>
  );
};

export default PageProduct;
