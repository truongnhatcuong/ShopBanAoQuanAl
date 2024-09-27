import React, { useEffect, useState } from "react";
import DeleteSupplier from "./DeleteSupplier";

interface ISupplier {
  supplier_id: number;
  supplier_name: string;
  contact_info: string;
}
interface ISupplierProps {
  supplier: ISupplier[];
  closeHandle: (supplier: ISupplier) => void;
}

const TableSupplier = ({ supplier, closeHandle }: ISupplierProps) => {
  const [supplierList, setSupplierList] = useState<ISupplier[]>(supplier);

  useEffect(() => {
    setSupplierList(supplier);
  }, [supplier]);
  function DeleteHandle(supplier_id: number) {
    setSupplierList(
      supplierList.filter((item) => item.supplier_id !== supplier_id)
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra text-sm">
        {/* head */}
        <thead>
          <tr>
            <th className="px-2 py-1 w-20">ID</th>
            <th className="px-2 py-1 w-60">Name Supplier</th>
            <th className="px-2 py-1 w-40">contacts</th>
            <th className="px-2 py-1 w-40">Actions</th>
          </tr>
        </thead>
        <tbody>
          {supplierList.map((item) => (
            <tr key={item.supplier_id}>
              <th className="px-2 py-1">{item.supplier_id}</th>
              <td className="px-2 py-1">{item.supplier_name}</td>
              <td className="px-2 py-1">{item.contact_info}</td>
              <td className="px-2 py-1 space-x-2 flex">
                <DeleteSupplier
                  supplier_id={item.supplier_id}
                  DeleteHandler={DeleteHandle}
                />
                <button
                  className="bg-blue-500 p-1 rounded-md hover:bg-blue-600 text-white font-medium"
                  onClick={() => closeHandle(item)}
                >
                  UPDATE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSupplier;
