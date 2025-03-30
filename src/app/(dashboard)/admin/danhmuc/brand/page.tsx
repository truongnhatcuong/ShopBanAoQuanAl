/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import AddBrand from "@/app/(dashboard)/admin/danhmuc/brand/ComponnentsBrand/AddBrand";
import TableBrand from "@/app/(dashboard)/admin/danhmuc/brand/ComponnentsBrand/TableBrand";
import UpdateBrand from "@/app/(dashboard)/admin/danhmuc/brand/ComponnentsBrand/UpdateBrand";
import Pagination from "@/app/(dashboard)/admin/componentsFunction/Pagination";
import SearchParamInput from "@/app/(dashboard)/admin/componentsFunction/SearchParamInput";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import SelectPagination from "../../componentsFunction/SelectPagination";

interface IBrand {
  brand_id: number;
  brand_name: string;
  description: string;
}

// eslint-disable-next-line @next/next/no-async-client-component
const Page = () => {
  const [brand, setBrand] = useState<IBrand[]>([]);
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const ApiBrand = async () => {
    const reponse = await fetch(
      `/api/brand?limit=${limit}&page=${currentPage}&search=${search}`,
      { next: { revalidate: 500 } }
    );
    const data = await reponse.json();
    setBrand(data.brand || []);
    setTotalPages(data.pagination.totalPages);
  };
  useEffect(() => {
    ApiBrand();
  }, [limit, currentPage, search]);

  return (
    <>
      <div className="flex justify-between mx-6 mt-5">
        <SearchParamInput searchTerm={search} setSearchTerm={setSearch} />
        <AddBrand reloadData={ApiBrand} />
      </div>
      <div>
        <TableBrand brandlocal={brand} reloadData={ApiBrand} />
      </div>
      <div className="flex justify-between mx-4 ">
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

export default Page;
