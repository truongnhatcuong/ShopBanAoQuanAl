"use client";
import React from "react";
import DeleteBrand from "./DeleteBrand";
import { FaPen } from "react-icons/fa";
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
          <tr className="bg-gray-100">
            <th className="px-4 py-2 w-1/4 text-left">Name Brand</th>
            <th className="px-4 py-2 w-1/2 text-center">Description</th>
            <th className="px-4 py-2 w-1/4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {brandlocal.map((item) => (
            <tr key={item.brand_id}>
              <td className="px-4 py-2 text-left">{item.brand_name}</td>
              <td className="px-4 py-2 text-center">{item.description}</td>
              <td className="px-4 py-2 space-x-2 flex justify-center ">
                <button
                  className="text-blue-500 hover:text-blue-600 "
                  onClick={() => openEditModal(item)}
                >
                  <FaPen />
                </button>
                <DeleteBrand
                  DeleteHandler={HanlerDelete}
                  brand_id={item.brand_id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableBrand;
