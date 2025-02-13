/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import TableProduct from "./components/TableProduct";
import AddProduct from "./components/Addproduct";
import debounce from "lodash.debounce";
import { Search } from "lucide-react";
import Pagination from "@/app/components/componentsFunction/Pagination";
import { useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [totalPages, setTotalPages] = useState(1);
  const ApiImage = async () => {
    const res = await fetch("/api/ImageProduct");
    await res.json();
  };

  const [product, setProduct] = useState<Product[] | []>([]);
  const fetchApiProduct = debounce(
    async (searchTerm: string, page = currentPage) => {
      setLoading(true);
      const res = await fetch(
        `/api/product?search=${searchTerm.toLowerCase()}&page=${page}&limit=5`
      );
      const data = await res.json();
      await ApiImage();
      setLoading(false);
      setTotalPages(data.pagination.totalPages);
      setProduct(data.product);
    },
    500
  );

  console.log("page", currentPage);
  console.log("total", totalPages);

  useEffect(() => {
    fetchApiProduct(query);
    return () => fetchApiProduct.cancel();
  }, [query, currentPage]);

  if (loading === true) {
    <p className="text-gray-500 text-center">Đang tải dữ liệu...</p>;
  }
  return (
    <>
      <div className="flex justify-end mb-3 mr-7">
        <AddProduct
          reloadData={() => fetchApiProduct(query, currentPage)}
          query={query}
          setQuery={setQuery}
        />
      </div>

      <div>
        {product.length === 0 && !loading ? (
          <p className="text-gray-500 text-center">
            không có sản phẩm nào có tên{" "}
            <span className="text-2xl font-medium text-red-500">{query}</span>
          </p>
        ) : (
          <TableProduct
            productData={product}
            reloadData={() => fetchApiProduct(query, currentPage)}
          />
        )}
      </div>
      <div>
        {" "}
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
