import React from "react";
import { CiSearch } from "react-icons/ci";

interface ISeachParams {
  searchTerm: string;
  setSearchTerm: (value: any) => void;
}
const SearchParamInput = ({ searchTerm, setSearchTerm }: ISeachParams) => {
  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        className="w-96 p-2 border rounded-lg ml-2 mb-3 px-4 py-2.5 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        transition duration-150 ease-in-out
        placeholder:text-gray-400
        hover:border-gray-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <CiSearch className="absolute right-3 top-[25px] -translate-y-1/2 w-7 h-7 text-gray-400" />
    </div>
  );
};

export default SearchParamInput;
