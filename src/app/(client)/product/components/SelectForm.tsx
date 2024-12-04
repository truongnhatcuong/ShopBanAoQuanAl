import React from "react";
interface SelectFormProps {
  onSortChange: (option: string) => void;
}

const SelectForm = ({ onSortChange }: SelectFormProps) => {
  return (
    <div className=" mr-12">
      <select
        className="border-b-2 border-black p-3 rounded-none text-sm outline-none cursor-pointer"
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="" className="text-xs ">
          Tùy Chọn
        </option>
        <option value="new" className="text-xs hover:bg-blue-600">
          Mới Nhất
        </option>
        <option value="price_asc" className="text-xs  hover:bg-blue-600">
          Giá Tăng Dần
        </option>
        <option value="price_desc" className="text-xs  hover:bg-blue-600">
          Giá Giảm Dần
        </option>
        <option value="a-z" className="text-xs  hover:bg-blue-600">
          Từ A đến Z
        </option>
        <option value="z-a" className="text-xs  hover:bg-blue-600">
          Từ Z đến A
        </option>
      </select>
    </div>
  );
};

export default SelectForm;
