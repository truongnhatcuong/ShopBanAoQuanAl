"use client";
import React from "react";
import DeleteBrand from "./DeleteBrand";

interface IBrand {
  brand_id: number;
  brand_name: string;
  description: string;
}
interface IBranProps {
  brandlocal: IBrand[];
  setBrand: React.Dispatch<React.SetStateAction<IBrand[]>>;
  openEditModal: (brand: IBrand) => void;
}
const TableBrand = ({ brandlocal, setBrand, openEditModal }: IBranProps) => {
  const HanlerDelete = (brand_id: number) => {
    setBrand(brandlocal.filter((item) => item.brand_id !== brand_id));
  };

  return (
    <div className="overflow-x-auto">
      <table className="table ">
        <thead>
          <tr>
            <th className="px-2 py-1 w-10">id</th>
            <th className="px-2 py-1 w-20">Name Brand</th>
            <th className="px-2 py-1 w-85 text-center">DescripTion</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {brandlocal.map((item) => (
            <tr key={item.brand_id}>
              <td className="px-2 py-1">{item.brand_id}</td>
              <td className="px-2 py-1">{item.brand_name}</td>
              <td className="px-2 py-1">{item.description}</td>
              <td className="px-2 py-1 space-x-2 flex">
                <DeleteBrand
                  DeleteHandler={HanlerDelete}
                  brand_id={item.brand_id}
                />
                <button
                  className="bg-blue-500 p-1 rounded-lg hover:bg-blue-600 text-white font-bold"
                  onClick={() => openEditModal(item)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableBrand;
