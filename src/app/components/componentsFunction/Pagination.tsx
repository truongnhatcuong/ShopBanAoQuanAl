"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  keyword: string;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  keyword,
  onPageChange,
}: PaginationProps) => {
  function handlerPreviour() {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }
  function handlerNext() {
    if (currentPage) {
      onPageChange(currentPage + 1);
    }
  }

  return (
    <div className="fixed bottom-4 right-4  p-3 rounded-lg  z-50">
      <div className="text-gray-950 font-medium flex px-3 pb-1 justify-center sm:justify-start sm:space-x-10  sm:px-0 ">
        <div
          className="flex flex-col items-center cursor-pointer hover:underline"
          onClick={handlerPreviour}
        >
          <BsChevronLeft className="h-4 " />
          <p>Previous</p>
        </div>

        <span className="text-xl">{currentPage}</span>

        <div
          className="flex flex-col items-center cursor-pointer hover:underline"
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
