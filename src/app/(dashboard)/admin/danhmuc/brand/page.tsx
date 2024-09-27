"use client";
import AddBrand from "@/app/components/ComponnentsBrand/AddBrand";
import TableBrand from "@/app/components/ComponnentsBrand/TableBrand";
import UpdateBrand from "@/app/components/ComponnentsBrand/UpdateBrand";
import { useEffect, useState } from "react";

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
          className="bg-green-500 p-2 rounded-lg text-sm font-bold text-white hover:bg-green-700"
          onClick={() => setShowAdd(true)}
        >
          ADD BRAND
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
