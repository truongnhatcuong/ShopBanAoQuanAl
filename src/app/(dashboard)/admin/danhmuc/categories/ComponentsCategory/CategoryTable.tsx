import React, { useState } from "react";
import DeleteCategories from "./DeleteCategories";

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
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="table-auto w-full text-sm text-left text-gray-500">
        {/* head */}
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="p-4 text-center">Tên danh mục</th>
            <th className="p-4 ">Mô tả</th>
            <th className="p-4 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-4 text-gray-600">
                Chưa có danh mục
              </td>
            </tr>
          ) : (
            categories.map((category) => (
              <tr
                key={category.category_id}
                className="border-b hover:bg-gray-100 transition-colors"
              >
                <td className="p-4 text-center">{category.category_name}</td>
                <td className="p-4">{category.description}</td>
                <td className="p-4 flex justify-center gap-4">
                  <DeleteCategories
                    deleteCategories={handleDelete}
                    category_id={category.category_id}
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-all"
                    onClick={() => openEditModal(category)}
                  >
                    Cập Nhật
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
