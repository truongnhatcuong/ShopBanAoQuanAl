"use client";
import AddCustomer from "@/app/(dashboard)/admin/danhmuc/customer/componentsCustomer/AddCustomer";
import TableCustomer from "@/app/(dashboard)/admin/danhmuc/customer/componentsCustomer/TableCustomer";
import Pagination from "@/app/(dashboard)/admin/componentsFunction/Pagination";
import SearchParamInput from "@/app/(dashboard)/admin/componentsFunction/SearchParamInput";
import SelectPagination from "@/app/(dashboard)/admin/componentsFunction/SelectPagination";
import React, { useEffect, useState } from "react";

interface ICustomer {
  customer_id: number;
  name: string;
  email: string;
  phone: number;
  address: string;
  username: string;
  password: string;
  roleId: number;
}

const PageCustomer = () => {
  const [customer, SetCustomer] = useState<ICustomer[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortOrder, setSortOrder] = useState("asc");
  async function ApiCustomer() {
    const req = await fetch(
      `/api/customer?search=${search}&page=${currentPage}&limit=${limit}&sortOrder=${sortOrder}`,
      {
        cache: "force-cache",
        next: { revalidate: 120 },
      }
    );
    const data = await req.json();
    SetCustomer(data.getCustomer);
    setTotalPages(data.pagination.totalPages);
  }
  useEffect(() => {
    ApiCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, currentPage, limit, sortOrder]);
  return (
    <>
      <div className="mt-5">
        <SearchParamInput searchTerm={search} setSearchTerm={setSearch} />
      </div>
      <div className="mt-7">
        <TableCustomer
          customer={customer}
          reloadData={ApiCustomer}
          sortOrder={sortOrder}
          SetsortOrder={setSortOrder}
        />
      </div>
      <div className="flex justify-between mx-3">
        <SelectPagination setLimit={setLimit} value={limit} />
        <Pagination
          currentPage={currentPage}
          hasData={currentPage < totalPages}
          onPageChange={(currentPage) => setCurrentPage(currentPage)}
        />
      </div>
    </>
  );
};

export default PageCustomer;
