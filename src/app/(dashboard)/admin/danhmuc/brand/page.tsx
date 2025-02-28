/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import AddBrand from "@/app/(dashboard)/admin/danhmuc/brand/ComponnentsBrand/AddBrand";
import TableBrand from "@/app/(dashboard)/admin/danhmuc/brand/ComponnentsBrand/TableBrand";
import UpdateBrand from "@/app/(dashboard)/admin/danhmuc/brand/ComponnentsBrand/UpdateBrand";
import Pagination from "@/app/components/componentsFunction/Pagination";
import SearchParamInput from "@/app/components/componentsFunction/SearchParamInput";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";

interface IBrand {
  brand_id: number;
  brand_name: string;
  description: string;
}

// eslint-disable-next-line @next/next/no-async-client-component
const Page = () => {
  const [brand, setBrand] = useState<IBrand[]>([]);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const [selectBrand, setSelectBrand] = useState<IBrand | null>(null);
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const ApiBrand = async () => {
    const reponse = await fetch(
      `/api/brand?limit=${limit}&page=${currentPage}&search=${search}`
    );
    const data = await reponse.json();
    setBrand(data.brand || []);
    setTotalPages(data.pagination.totalPages);
  };
  useEffect(() => {
    ApiBrand();
  }, [limit, currentPage, search]);

  const OpenModal = (brand: IBrand) => {
    setSelectBrand(brand);
    setShowUpdate(true);
  };

  return (
    <>
      <div className="flex justify-between mx-6 mt-5">
        <SearchParamInput searchTerm={search} setSearchTerm={setSearch} />
        <button
          className="bg-blue-600 px-2 py-1 h-10 font-bold text-white hover:bg-blue-700 flex items-center"
          onClick={() => setShowAdd(true)}
        >
          <FiPlus /> <span>Thêm mới</span>
        </button>
        {showAdd && (
          <AddBrand
            closeHandle={() => setShowAdd(false)}
            reloadData={ApiBrand}
          />
        )}
      </div>
      <div>
        <TableBrand
          brandlocal={brand}
          setBrand={setBrand}
          openEditModal={OpenModal}
        />
        {showUpdate && selectBrand && (
          <UpdateBrand
            Brand={selectBrand}
            closeHandle={() => setShowUpdate(false)}
            reloadData={ApiBrand}
          />
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        hasData={currentPage < totalPages}
        onPageChange={(currentPage) => setCurrentPage(currentPage)}
      />
    </>
  );
};

export default Page;
