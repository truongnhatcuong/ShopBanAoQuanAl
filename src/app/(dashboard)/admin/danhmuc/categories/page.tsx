"use client";
import "react-toastify/dist/ReactToastify.css";
import AddCategories from "@/app/(dashboard)/admin/danhmuc/categories/ComponentsCategory/AddCategories";
import CategoryTable from "@/app/(dashboard)/admin/danhmuc/categories/ComponentsCategory/CategoryTable";
import UpdateCategories from "@/app/(dashboard)/admin/danhmuc/categories/ComponentsCategory/UpdateCategories";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import Pagination from "@/app/(dashboard)/admin/componentsFunction/Pagination";
import { FiPlus } from "react-icons/fi";
import SelectPagination from "@/app/(dashboard)/admin/componentsFunction/SelectPagination";
import SearchParamInput from "@/app/(dashboard)/admin/componentsFunction/SearchParamInput";

interface Icategories {
  category_id: number;
  category_name: string;
  description: string;
}

const PageContent = () => {
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(5);
  const [sortOrder, setSortOrder] = useState("asc");
  const [categories, setCategories] = useState<Icategories[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchData = async () => {
    const response = await fetch(
      `/api/categories?page=${currentPage}&keyword=${keyword}&limit=${limit}&sortOrder=${sortOrder}`,
      { next: { revalidate: 600 } }
    );

    const data = await response.json();
    setCategories(data.categories || []);
    setTotalPages(data.totalPages || 1);
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, keyword, limit, sortOrder]);

  return (
    <div className="">
      <div
        className="flex justify-between mr-7 
      my-5"
      >
        <SearchParamInput searchTerm={keyword} setSearchTerm={setKeyword} />
        <AddCategories reloadData={fetchData} />
      </div>
      <div>
        <CategoryTable
          reloadData={fetchData}
          SetsortOrder={setSortOrder}
          sortOrder={sortOrder}
          categories={categories}
        />

        <div className="flex justify-between">
          <SelectPagination setLimit={setLimit} value={limit} />
          <Pagination
            hasData={currentPage < totalPages}
            currentPage={currentPage}
            onPageChange={(newPage) => setCurrentPage(newPage)}
          />
        </div>
      </div>
    </div>
  );
};

const Page = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <PageContent />
  </Suspense>
);

export default Page;
