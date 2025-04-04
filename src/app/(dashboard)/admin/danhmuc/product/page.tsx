/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useCallback, useEffect, useState } from "react";
import TableProduct from "./components/TableProduct";
import AddProduct from "./components/Addproduct";
import debounce from "lodash.debounce";
import { Search } from "lucide-react";
import Pagination from "@/app/(dashboard)/admin/componentsFunction/Pagination";
import { useSearchParams } from "next/navigation";
import SelectPagination from "@/app/(dashboard)/admin/componentsFunction/SelectPagination";
import SearchParamInput from "@/app/(dashboard)/admin/componentsFunction/SearchParamInput";
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

interface ICategory {
  category_id: number;
  category_name: string;
}

interface IBrand {
  brand_id: number;
  brand_name: string;
}
interface ISeason {
  season_id: number;
  season_name: string;
}
interface ISize {
  size_id: number;
  name_size: string;
}

const PageProduct = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  // hiển thị tên các danh mục
  const [category, setCategory] = useState<ICategory[] | []>([]);
  const [brand, setBrand] = useState<IBrand[] | []>([]);
  const [season, setSeason] = useState<ISeason[] | []>([]);
  const [size, setSize] = useState<ISize[] | []>([]);
  const ApiImage = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/ImageProduct`
    );
    await res.json();
  };

  const [product, setProduct] = useState<Product[] | []>([]);
  const fetchApiProduct = async () => {
    setLoading(true);
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/product?search=${searchTerm.toLowerCase()}&page=${currentPage}&limit=${limit}&sortOrder=${sortOrder}`,
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

  const fetchData = useCallback(async () => {
    try {
      const [categoryRes, brandRes, seasonRes, sizeRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
          next: { revalidate: 3600 },
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/brand`, {
          next: { revalidate: 3600 },
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/season`, {
          next: { revalidate: 3600 },
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/size`, {
          next: { revalidate: 86400 },
        }),
      ]);

      const [categoriesData, brandData, seasonData, sizeData] =
        await Promise.all([
          categoryRes.json(),
          brandRes.json(),
          seasonRes.json(),
          sizeRes.json(),
        ]);

      setCategory(categoriesData.categories);
      setBrand(brandData.brand);
      setSeason(seasonData.season);
      setSize(sizeData.size);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu sản phẩm:", error);
    }
  }, []);

  console.log(brand);

  useEffect(() => {
    fetchData();
  }, []);

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
          <AddProduct
            reloadData={fetchApiProduct}
            brand={brand}
            category={category}
            season={season}
            size={size}
          />
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
          brand={brand}
          category={category}
          season={season}
          size={size}
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
