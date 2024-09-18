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
  const router = useRouter();
  const handlePageChange = (page: number) => {
    if (page >= 1) {
      onPageChange(page);
      router.push(`/admin/danhmuc/categories?page=${page}&keyword=${keyword}`);
    }
  };
  return (
    <div className="pagination-container">
      <div className="text-blue-600 flex px-10 pb-4 justify-center sm:justify-start sm:space-x-44  sm:px-0 text-xl">
        {currentPage > 1 && (
          <div
            className="flex flex-col items-center cursor-pointer hover:underline"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <BsChevronLeft className="h-5 " />
            <p>Previous</p>
          </div>
        )}
        <span>{currentPage}</span>

        <div
          className="flex flex-col items-center cursor-pointer hover:underline"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <BsChevronRight className="h-5" />
          <p>Next</p>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
