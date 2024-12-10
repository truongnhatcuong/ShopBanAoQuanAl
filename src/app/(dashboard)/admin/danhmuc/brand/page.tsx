"use client";
import AddBrand from "@/app/(dashboard)/admin/danhmuc/brand/ComponnentsBrand/AddBrand";
import TableBrand from "@/app/(dashboard)/admin/danhmuc/brand/ComponnentsBrand/TableBrand";
import UpdateBrand from "@/app/(dashboard)/admin/danhmuc/brand/ComponnentsBrand/UpdateBrand";
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

  const ApiBrand = async () => {
    const reponse = await fetch(`/api/brand`);
    const data = await reponse.json();
    setBrand(data.brand || []);
  };
  useEffect(() => {
    ApiBrand();
  }, []);

  const OpenModal = (brand: IBrand) => {
    setSelectBrand(brand);
    setShowUpdate(true);
  };

  return (
    <div>
      <div className="flex justify-end mr-6 ">
        <button
          className="bg-blue-600 px-2 py-1  font-bold text-white hover:bg-blue-700 flex items-center"
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
    </div>
  );
};

export default Page;
