import React, { useEffect, useState } from "react";
import DeleteSupplier from "./DeleteSupplier";
import { FaPen } from "react-icons/fa";
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
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Supplier Name
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contacts
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {supplierList.map((item) => (
            <tr key={item.supplier_id}>
              <td className="px-4 py-2 whitespace-nowrap">
                {item.supplier_name}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                {item.contact_info}
              </td>
              <td className="px-4 py-2 whitespace-nowrap flex space-x-2">
                <DeleteSupplier
                  supplier_id={item.supplier_id}
                  DeleteHandler={DeleteHandle}
                />
                <button
                  className="text-blue-500 p-1 rounded-md hover:text-blue-600  text-xl"
                  onClick={() => closeHandle(item)}
                >
                  <FaPen />
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
