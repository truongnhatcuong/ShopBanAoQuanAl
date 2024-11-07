"use client";
import AddSupplier from "@/app/components/ComponentsSupplier/AddSupplier";
import TableSupplier from "@/app/components/ComponentsSupplier/TableSupplier";
import UpdateSuplier from "@/app/components/ComponentsSupplier/UpdateSuplier";
import React, { useEffect, useState } from "react";

interface ISupplier {
  supplier_id: number;
  supplier_name: string;
  contact_info: string;
}

const Supplier = () => {
  const [supplier, setSupplier] = useState<ISupplier[]>([]);
  const [modalIsOpen, setmodalIsOpen] = useState<boolean>(false);
  const [selectSupplier, setSelectSupplier] = useState<ISupplier | null>(null);
  const [showAddmodal, setShowAllmodal] = useState<boolean>(false);
  async function apiSupplier() {
    const req = await fetch(`/api/supplier`);
    const data = await req.json();
    setSupplier(data.supplier);
  }
  useEffect(() => {
    apiSupplier();
  }, []);

  const closeHandler = (supplier: ISupplier) => {
    setSelectSupplier(supplier);
    setmodalIsOpen(true);
  };
  return (
    <div>
      <div className="flex justify-end mr-7 mb-4 ">
        <button
          className="bg-blue-500 py-3 px-6 rounded-md  font-bold text-white hover:bg-blue-700"
          onClick={() => setShowAllmodal(true)}
        >
          Thêm Nhà Cung Cấp
        </button>
        {showAddmodal && (
          <AddSupplier
            closeHandle={() => setShowAllmodal(false)}
            reloadData={apiSupplier}
          />
        )}
      </div>
      <div>
        <TableSupplier supplier={supplier} closeHandle={closeHandler} />
        {modalIsOpen && selectSupplier && (
          <UpdateSuplier
            closeHandle={() => setmodalIsOpen(false)}
            supplier={selectSupplier}
            reloadData={apiSupplier}
          />
        )}
      </div>
    </div>
  );
};

export default Supplier;
