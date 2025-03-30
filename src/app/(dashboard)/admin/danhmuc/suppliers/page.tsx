/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import AddSupplier from "@/app/(dashboard)/admin/danhmuc/suppliers/ComponentsSupplier/AddSupplier";
import TableSupplier from "@/app/(dashboard)/admin/danhmuc/suppliers/ComponentsSupplier/TableSupplier";
import { FiPlus } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import SearchParamInput from "@/app/(dashboard)/admin/componentsFunction/SearchParamInput";
import { useSearchParams } from "next/navigation";
import SelectPagination from "@/app/(dashboard)/admin/componentsFunction/SelectPagination";
import Pagination from "@/app/(dashboard)/admin/componentsFunction/Pagination";
interface ISupplier {
  supplier_id: number;

  supplier_name: string;
  contact_info: string;
  ProductSuppliers: {
    quantity: number;
    supply_date: string;
    Product: {
      product_id: number;
      product_name: string;
    };
  }[];
}
const Supplier = () => {
  const [supplier, setSupplier] = useState<ISupplier[]>([]);
  const [showAddmodal, setShowAllmodal] = useState<boolean>(false);
  const [limit, setLimit] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSrearch] = useState("");
  async function apiSupplier() {
    const req = await fetch(
      `/api/supplier?limit=${limit}&search=${search}&page=${currentPage}`
    );
    const data = await req.json();
    setSupplier(data.supplier);
    setTotalPages(data.pagination.totalPages);
    setCurrentPage(data.pagination.currentPage);
  }

  useEffect(() => {
    apiSupplier();
  }, [limit, search, currentPage]);

  return (
    <>
      <div className="flex justify-between mr-7 mb-4 ">
        <div className="mt-4">
          <SearchParamInput searchTerm={search} setSearchTerm={setSrearch} />
        </div>
        <button
          className="bg-blue-600 px-2 py-1 mt-5 h-10 font-bold text-white hover:bg-blue-700 flex items-center"
          onClick={() => setShowAllmodal(true)}
        >
          <FiPlus />
          <span>Thêm mới</span>
        </button>
        {showAddmodal && (
          <div>
            <AddSupplier
              closeHandle={() => setShowAllmodal(false)}
              reloadData={apiSupplier}
            />
          </div>
        )}
      </div>
      <div>
        <TableSupplier
          supplier={supplier}
          reloadData={apiSupplier}
          search={search}
        />
      </div>
      <div>
        <SelectPagination setLimit={setLimit} value={limit} />
        <Pagination
          currentPage={currentPage}
          hasData={currentPage < totalPages}
          onPageChange={(value) => setCurrentPage(value)}
        />
      </div>
    </>
  );
};

export default Supplier;
