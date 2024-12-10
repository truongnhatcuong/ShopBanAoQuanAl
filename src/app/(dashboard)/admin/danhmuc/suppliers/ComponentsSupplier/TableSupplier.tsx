import React, { useEffect, useState } from "react";
import DeleteSupplier from "./DeleteSupplier";
import UpdateSupplier from "./UpdateSuplier";

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
interface ISupplierProps {
  supplier: ISupplier[];
  reloadData: () => void;
}

const TableSupplier = ({ supplier, reloadData }: ISupplierProps) => {
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
        <thead className="bg-gray-50 ">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Supplier Name
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Contacts
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Quantity
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              SupplyDate
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Product
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {supplierList.map((supplier) =>
            supplier.ProductSuppliers.map((ps) => (
              <tr key={supplier.supplier_id} className="">
                <td className="px-4 py-2">{supplier.supplier_name}</td>
                <td className="px-4 py-2">{supplier.contact_info}</td>
                <td className="px-4 py-2 ">{ps.quantity}</td>
                <td className="px-4 py-2 ">
                  {new Date(ps.supply_date).toLocaleDateString("vi-VN")}
                </td>
                <td className="px-4 py-2">{ps.Product.product_name}</td>

                <td className="px-3 py-2 flex space-x-4">
                  <DeleteSupplier
                    supplier_id={supplier.supplier_id}
                    DeleteHandler={DeleteHandle}
                  />
                  <UpdateSupplier reloadData={reloadData} supplier={supplier} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableSupplier;
