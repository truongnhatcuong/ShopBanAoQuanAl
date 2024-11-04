import React, { useState } from "react";
import DeleteCategories from "./DeleteCategories";
import { FaPen } from "react-icons/fa";
interface Icategories {
  category_id: number;
  category_name: string;
  description: string;
}

interface ICategoryTableProps {
  categories: Icategories[];
  setCategories: React.Dispatch<React.SetStateAction<Icategories[]>>;
  openEditModal: (category: Icategories) => void;
}
const CategoryTable = ({
  categories,
  setCategories,
  openEditModal,
}: ICategoryTableProps) => {
  const handleDelete = (category_id: number) => {
    setCategories(
      categories.filter((item) => item.category_id !== category_id)
    );
  };

  return (
    <div className="overflow-x-auto ">
      <table className="table text-sm">
        {/* head */}
        <thead>
          <tr>
            <th className="px-2 py-1 w-40">Name</th>
            <th className="px-2 py-1 w-60">Description</th>
            <th className="px-2 py-1 w-40">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-2">
                Chưa có danh mục
              </td>
            </tr>
          ) : (
            <>
              {categories.map((category) => (
                <tr key={category.category_id} className="">
                  <td className="px-2 py-1">{category.category_name}</td>
                  <td className="px-2 py-1">{category.description}</td>
                  <td className="px-2 py-1 space-x-4 ">
                    <button
                      className="text-blue-500  hover:text-blue-700 text-xl "
                      onClick={() => openEditModal(category)}
                    >
                      <FaPen />
                    </button>
                    <DeleteCategories
                      deleteCategories={handleDelete}
                      category_id={category.category_id}
                    />
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
