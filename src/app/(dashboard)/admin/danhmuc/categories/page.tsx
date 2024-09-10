"use client";
import AddCategories from "@/app/components/ComponentsAdmin/AddCategories";
import CategoryTable from "@/app/components/ComponentsAdmin/CategoryTable";
import UpdateCategories from "@/app/components/ComponentsAdmin/UpdateCategories";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

interface Icategories {
  category_id: number;
  category_name: string;
  description: string;
}

const Page = () => {
  const [categories, setCategories] = useState<Icategories[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Icategories | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data.categories || []);
    };
    fetchData();
  }, []);

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
          Add
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
      </div>
    </div>
  );
};

export default Page;
