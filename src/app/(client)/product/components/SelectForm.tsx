import React from "react";

const SelectForm = () => {
  return (
    <div className=" mr-12">
      <select className="border-b-2 border-black p-3 rounded-none text-sm outline-none">
        <option value="" className="text-xs ">
          Tùy Chọn
        </option>
        <option value="" className="text-xs hover:bg-blue-600">
          Mới Nhất
        </option>
        <option value="" className="text-xs  hover:bg-blue-600">
          Giá Tăng Dần
        </option>
        <option value="" className="text-xs  hover:bg-blue-600">
          Giá Giảm Dần
        </option>
        <option value="" className="text-xs  hover:bg-blue-600">
          Từ A đến Z
        </option>
        <option value="" className="text-xs  hover:bg-blue-600">
          Từ Z đến A
        </option>
      </select>
    </div>
  );
};

export default SelectForm;
