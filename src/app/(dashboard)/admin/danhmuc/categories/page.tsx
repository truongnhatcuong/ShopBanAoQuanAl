"use client";

import AddCategories from "@/app/components/ComponentsCategory/AddCategories";
import CategoryTable from "@/app/components/ComponentsCategory/CategoryTable";
import UpdateCategories from "@/app/components/ComponentsCategory/UpdateCategories";
import Pagination from "@/app/components/leftMenu/Pagination";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

interface Icategories {
  category_id: number;
  category_name: string;
  description: string;
}

const Page = () => {
  const searchParams = useSearchParams();
  //
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(4);
  const [sortOrder, setSortOrder] = useState("asc");
  const [categories, setCategories] = useState<Icategories[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Icategories | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/categories?page=${currentPage}&keyword=${keyword}&limit=${limit}&sortOrder=${sortOrder}`
      );

      const data = await response.json();
      setCategories(data.categories || []);
      setTotalPages(data.totalPages || 1);
    };
    fetchData();
  }, [currentPage, keyword, limit, sortOrder]);

  const openEditModal = (category: Icategories) => {
    setSelectedCategory(category);
    setShowUpdateModal(true);
  };

  return (
    <div className="ml-5">
      <ToastContainer />
      <div className="flex justify-end mr-7 mt-4">
        <button
          className="btn btn-success text-white font-medium"
          onClick={() => setShowAddModal(true)}
        >
          Add Category
        </button>
        {showAddModal && (
          <AddCategories closeHandle={() => setShowAddModal(false)} />
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
            closeHandle={() => setShowUpdateModal(false)}
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

export default Page;
