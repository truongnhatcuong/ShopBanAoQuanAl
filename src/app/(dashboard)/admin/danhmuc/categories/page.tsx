"use client";
import "react-toastify/dist/ReactToastify.css";
import AddCategories from "@/app/components/ComponentsCategory/AddCategories";
import CategoryTable from "@/app/components/ComponentsCategory/CategoryTable";
import UpdateCategories from "@/app/components/ComponentsCategory/UpdateCategories";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import Pagination from "@/app/components/componentsFunction/Pagination";

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
      `/api/categories?page=${currentPage}&keyword=${keyword}&limit=${limit}&sortOrder=${sortOrder}`
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
      <div className="flex justify-end mr-7 mt-2">
        <button
          className="bg-blue-500 sm:py-3 sm:px-6 p-1 rounded-md font-bold text-white hover:bg-blue-700 mb-5 sm:mt-0"
          onClick={() => setShowAddModal(true)}
        >
          Thêm Danh Mục
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
          <div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              keyword={keyword}
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
