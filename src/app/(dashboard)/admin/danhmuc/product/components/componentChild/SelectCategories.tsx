import React from "react";

interface ICategories {
  category_id: number;
  category_name: string;
}
interface ICategoriesProps {
  categories: ICategories[];
  category_id: number | null;
  onCategoryChange: (id: number) => void;
}
const SelectCategories = ({
  categories,
  category_id,
  onCategoryChange,
}: ICategoriesProps) => {
  return (
    <div className="w-1/4">
      <label className="block text-sm font-semibold">
        DANH MỤC
        <select
          value={category_id || ""}
          onChange={(e) => onCategoryChange(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-md p-2 "
          required
        >
          <option value={""} disabled>
            Chọn danh mục
          </option>
          {categories.map((item) => (
            <option value={item.category_id} key={item.category_id}>
              {item.category_name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SelectCategories;
