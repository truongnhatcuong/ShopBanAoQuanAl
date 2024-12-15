import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";

interface IPromotion {
  discount: number;
  start_date: string;
  end_date: string;
  products: {
    product_name: string;
  }[];
}

interface IProp {
  promotion: IPromotion[];
}

const TablePromotion = (props: IProp) => {
  return (
    <div className="overflow-x-auto border rounded-lg shadow-md bg-white">
      <table className="table-auto w-full text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border">Giảm Giá (%)</th>
            <th className="py-3 px-4 border">Ngày Bắt Đầu</th>
            <th className="py-3 px-4 border">Ngày Kết Thúc</th>
            <th className="py-3 px-4 border">Tên Sản Phẩm</th>
            <th className="py-3 px-4 border text-center">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {props.promotion.map((item, index) =>
            item.products.map((item1, index1) => (
              <tr
                key={`${index}-${index1}`}
                className="even:bg-gray-50 hover:bg-gray-100"
              >
                <td className="py-2 px-4 border">{item.discount}%</td>
                <td className="py-2 px-4 border">
                  {new Date(item.start_date).toLocaleDateString("vi-VN")}
                </td>
                <td className="py-2 px-4 border">
                  {new Date(item.end_date).toLocaleDateString("vi-VN")}
                </td>
                <td className="py-2 px-4 border">{item1.product_name}</td>
                <td className="py-2 px-4 border text-center space-x-5 ">
                  <button className="p-2 text-white bg-red-500 hover:bg-red-600 rounded text-xl ">
                    <AiOutlineDelete />
                  </button>
                  <button className="p-2 text-white bg-blue-500 hover:bg-blue-600 rounded text-xl">
                    <FaRegEdit />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablePromotion;
