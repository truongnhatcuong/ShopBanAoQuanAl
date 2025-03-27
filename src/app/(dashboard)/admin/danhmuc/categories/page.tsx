"use client";
import "react-toastify/dist/ReactToastify.css";
import AddCategories from "@/app/(dashboard)/admin/danhmuc/categories/ComponentsCategory/AddCategories";
import CategoryTable from "@/app/(dashboard)/admin/danhmuc/categories/ComponentsCategory/CategoryTable";
import UpdateCategories from "@/app/(dashboard)/admin/danhmuc/categories/ComponentsCategory/UpdateCategories";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import Pagination from "@/app/components/componentsFunction/Pagination";
import { FiPlus } from "react-icons/fi";
import SelectPagination from "@/app/components/componentsFunction/SelectPagination";
import SearchParamInput from "@/app/components/componentsFunction/SearchParamInput";

interface Icategories {
  category_id: number;
  category_name: string;
  description: string;
}

const PageContent = () => {
  const searchParams = useSearchParams();
  //
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(5);
  const [sortOrder, setSortOrder] = useState("asc");
  const [categories, setCategories] = useState<Icategories[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowupdateModel] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<Icategories | null>(
    null
  );

  const fetchData = async () => {
    const response = await fetch(
      `/api/categories?page=${currentPage}&keyword=${keyword}&limit=${limit}&sortOrder=${sortOrder}`,
      { next: { revalidate: 3600 }, cache: "force-cache" }
    );

    const data = await response.json();
    setCategories(data.categories || []);
    setTotalPages(data.totalPages || 1);
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, keyword, limit, sortOrder]);

  const openEditModal = (category: Icategories) => {
    setSelectedCategory(category);
    setShowupdateModel(true);
  };

  return (
    <div className="ml-5">
      <div
        className="flex justify-between mr-7 
      my-5"
      >
        <div>
          <SearchParamInput searchTerm={keyword} setSearchTerm={setKeyword} />
        </div>
        <button
          className="bg-blue-600 px-2 py-1 h-10 mt-1 font-bold text-white hover:bg-blue-700 flex items-center"
          onClick={() => setShowAddModal(true)}
        >
          <FiPlus /> <span>Thêm mới</span>
        </button>
        {showAddModal && (
          <AddCategories
            closeHandle={() => setShowAddModal(false)}
            reloadData={fetchData}
          />
        )}
      </div>
      <div>
        <CategoryTable
          SetsortOrder={setSortOrder}
          sortOrder={sortOrder}
          categories={categories}
          setCategories={setCategories}
          openEditModal={openEditModal}
        />
        {showUpdateModal && selectedCategory && (
          <UpdateCategories
            category={selectedCategory}
            closeHandle={() => setShowupdateModel(false)}
            reloadData={fetchData}
          />
        )}
        {!showAddModal && (
          <div className="flex justify-between">
            <SelectPagination setLimit={setLimit} value={limit} />

            <Pagination
              hasData={currentPage < totalPages}
              currentPage={currentPage}
              onPageChange={(newPage) => setCurrentPage(newPage)}
            />
          </div>
        )}
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
