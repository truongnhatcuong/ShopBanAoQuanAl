import React, { useEffect, useState } from "react";
import DeleteSupplier from "./DeleteSupplier";
import UpdateSupplier from "./UpdateSuplier";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  search: string;
}

const TableSupplier = ({ supplier, reloadData, search }: ISupplierProps) => {
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
      <Table className="table table-zebra text-sm">
        {/* head */}
        <TableHeader className="bg-gray-50 ">
          <TableRow>
            <TableHead className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Supplier Name
            </TableHead>
            <TableHead className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Contacts
            </TableHead>
            <TableHead className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Quantity
            </TableHead>
            <TableHead className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              SupplyDate
            </TableHead>
            <TableHead className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Product
            </TableHead>
            <TableHead className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        {supplier.length > 0 ? (
          <TableBody>
            {supplierList.map((supplier) =>
              supplier.ProductSuppliers.map((ps) => (
                <TableRow key={supplier.supplier_id} className="">
                  <TableCell className="px-4 py-2">
                    {supplier.supplier_name}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {supplier.contact_info}
                  </TableCell>
                  <TableCell className="px-4 py-2 ">{ps.quantity}</TableCell>
                  <TableCell className="px-4 py-2 ">
                    {new Date(ps.supply_date).toLocaleDateString("vi-VN")}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {ps.Product.product_name}
                  </TableCell>

                  <TableCell className="px-3 py-2 flex space-x-4">
                    <DeleteSupplier
                      supplier_id={supplier.supplier_id}
                      DeleteHandler={DeleteHandle}
                    />
                    <UpdateSupplier
                      reloadData={reloadData}
                      supplier={supplier}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        ) : (
          <TableBody>
            <TableRow>
              <TableCell colSpan={10} className="text-center">
                tìm kiếm không phù hợp với{" "}
                <span className="text-2xl text-red-600">{search}</span>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default TableSupplier;
