import React from "react";

interface ISelectPagination {
  value: number;
  setLimit: (value: number) => void;
}
const SelectPagination = ({ setLimit, value }: ISelectPagination) => {
  return (
    <>
      <select
        onChange={(e) => setLimit(Number(e.target.value))}
        id=""
        value={value}
        className="border border-gray-900 rounded-lg h-8 w-30 px-4 ml-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 mt-5"
      >
        <option value={5}>Mặc Định</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
        <option value={25}>25</option>
      </select>
    </>
  );
};

export default SelectPagination;
