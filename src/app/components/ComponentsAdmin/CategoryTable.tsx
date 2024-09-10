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
    <div className="overflow-x-auto mt-10">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Descripton</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.category_id}>
              <td>{category.category_id}</td>
              <td>{category.category_name}</td>
              <td>{category.description}</td>
              <td className="space-x-5">
                <DeleteCategories
                  deleteCategories={handleDelete}
                  category_id={category.category_id}
                />

                <button
                  className="bg-yellow-500 hover:bg-yellow-700 rounded-md p-3 text-white font-medium"
                  onClick={() => openEditModal(category)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
