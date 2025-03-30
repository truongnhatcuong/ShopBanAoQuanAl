"use client";

import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  hasData: boolean;
}

const Pagination = ({
  currentPage,
  onPageChange,
  hasData,
}: PaginationProps) => {
  function handlerPreviour() {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }
  function handlerNext() {
    if (hasData) {
      onPageChange(currentPage + 1);
    }
  }

  return (
    <div className=" flex justify-end  p-3 rounded-lg mt-3 mr-5">
      <div className="text-gray-950 font-medium flex px-3 pb-1 justify-center sm:justify-start sm:space-x-10  sm:px-0 ">
        <div
          className={`flex flex-col items-center cursor-pointer hover:underline ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed " : ""
          }`}
          onClick={handlerPreviour}
        >
          <BsChevronLeft className="h-4 " />
          <p>Previous</p>
        </div>

        <span className="text-xl">{currentPage}</span>

        <div
          className={`flex flex-col items-center cursor-pointer hover:underline ${
            !hasData ? "opacity-50 cursor-not-allowed " : ""
          }`}
          onClick={handlerNext}
        >
          <BsChevronRight className="h-4" />
          <p>Next</p>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
