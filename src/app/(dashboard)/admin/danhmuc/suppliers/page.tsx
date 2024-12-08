"use client";
import AddSupplier from "@/app/(dashboard)/admin/danhmuc/suppliers/ComponentsSupplier/AddSupplier";
import TableSupplier from "@/app/(dashboard)/admin/danhmuc/suppliers/ComponentsSupplier/TableSupplier";

import React, { useEffect, useState } from "react";
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
  async function apiSupplier() {
    const req = await fetch(`/api/supplier`);
    const data = await req.json();
    setSupplier(data.supplier);
  }
  useEffect(() => {
    apiSupplier();
  }, []);

  console.log(":", supplier);

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
        <TableSupplier supplier={supplier} reloadData={apiSupplier} />
      </div>
    </div>
  );
};

export default Supplier;
