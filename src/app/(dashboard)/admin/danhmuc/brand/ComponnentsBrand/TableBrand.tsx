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
  const HandlerDelete = (brand_id: number) => {
    setBrand(brandlocal.filter((item) => item.brand_id !== brand_id));
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-black text-white">
            <th className="px-6 py-3 text-left text-sm font-semibold  uppercase tracking-wider">
              Name Brand
            </th>
            <th className="px-6 py-3 text-center text-sm font-semibold  uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-center text-sm font-semibold  uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {brandlocal.length > 0 ? (
            brandlocal.map((item, index) => (
              <tr
                key={item.brand_id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="px-6 py-4 text-sm text-gray-800 text-left">
                  {item.brand_name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 text-center">
                  {item.description}
                </td>
                <td className="px-6 py-4 text-sm flex justify-center space-x-2">
                  <DeleteBrand
                    DeleteHandler={HandlerDelete}
                    brand_id={item.brand_id}
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow"
                    onClick={() => openEditModal(item)}
                  >
                    Cập Nhật
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={3}
                className="px-6 py-4 text-center text-gray-500 italic"
              >
                Không có dữ liệu.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableBrand;
