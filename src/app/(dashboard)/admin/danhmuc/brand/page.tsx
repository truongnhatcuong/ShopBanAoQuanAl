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
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectBrand, setSelectBrand] = useState<IBrand | null>(null);
  useEffect(() => {
    const ApiBrand = async () => {
      const reponse = await fetch(`/api/brand`);
      const data = await reponse.json();
      setBrand(data.brand || []);
    };
    ApiBrand();
  }, []);

  const OpenModal = (brand: IBrand) => {
    setSelectBrand(brand);
    setModalIsOpen(true);
  };

  return (
    <div>
      <div className="flex justify-end mr-6 my-5">
        <button
          className="btn btn-success text-white font-medium "
          onClick={() => setModalIsOpen(true)}
        >
          ADD BRAND
        </button>
        {modalIsOpen && <AddBrand closeHandle={() => setModalIsOpen(false)} />}
      </div>
      <div>
        <TableBrand
          brandlocal={brand}
          setBrand={setBrand}
          openEditModal={OpenModal}
        />
        {modalIsOpen && selectBrand && (
          <UpdateBrand
            Brand={selectBrand}
            closeHandle={() => setModalIsOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
