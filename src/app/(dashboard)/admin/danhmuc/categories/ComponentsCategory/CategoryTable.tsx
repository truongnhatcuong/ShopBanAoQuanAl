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
    <div className="overflow-x-auto ">
      <table className="table text-sm">
        {/* head */}
        <thead className="">
          <tr>
            <th className="p-2 w-40 bg-slate-600 text-white">Name</th>
            <th className="p-2 w-60 bg-slate-600 text-white">Description</th>
            <th className="p-2 w-40 bg-slate-600 text-white">Action</th>
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
                  <td className="p-2">{category.category_name}</td>
                  <td className="p-2">{category.description}</td>
                  <td className="p-2 flex gap-5 ">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => openEditModal(category)}
                    >
                      Cập Nhật
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
