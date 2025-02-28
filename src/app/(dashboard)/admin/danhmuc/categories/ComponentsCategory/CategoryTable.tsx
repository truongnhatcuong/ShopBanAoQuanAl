import React, { useState } from "react";
import DeleteCategories from "./DeleteCategories";
import { FaRegEdit } from "react-icons/fa";

interface Icategories {
  category_id: number;
  category_name: string;
  description: string;
}

interface ICategoryTableProps {
  categories: Icategories[];
  setCategories: React.Dispatch<React.SetStateAction<Icategories[]>>;
  openEditModal: (category: Icategories) => void;
  SetsortOrder: (value: string) => void;
  sortOrder: string;
}

const CategoryTable = ({
  categories,
  setCategories,
  openEditModal,
  SetsortOrder,
  sortOrder,
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
        <thead className="bg-black text-white">
          <tr>
            <th
              className="p-4 text-center flex items-center justify-center
            "
            >
              <div> Tên danh mục</div>
              <div
                onClick={() =>
                  SetsortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="cursor-pointer mt-[1px] ml-2"
              >
                {sortOrder === "asc" ? (
                  <p className="text-lg">↓</p>
                ) : (
                  <p className="text-lg">↑</p>
                )}
              </div>
            </th>
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
                    className="p-2 text-white bg-blue-500 hover:bg-blue-600 rounded text-xl"
                    onClick={() => openEditModal(category)}
                  >
                    <FaRegEdit />
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
