"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  promotion: IPromotion[] | [];
}

const PageTest = (props: IProp) => {
  return (
    <>
      <Table>
        <TableCaption>Danh Sách Sản Phẩm Khuyến Mãi</TableCaption>
        <TableHeader className="table-auto w-full text-left border-collapse">
          <TableRow>
            <TableHead>Giảm Giá (%)</TableHead>
            <TableHead>Ngày Bắt Đầu</TableHead>
            <TableHead>Ngày Kết Thúc</TableHead>
            <TableHead>Tên Sản Phẩm</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.promotion.map((item, index) =>
            item.products.map((item1, index1) => (
              <TableRow
                key={`${index}-${index1}`}
                className="even:bg-gray-50 hover:bg-gray-100"
              >
                <TableCell className="py-2 px-4 border">
                  {item.discount}%
                </TableCell>
                <TableCell className="py-2 px-4 border">
                  {" "}
                  {new Date(item.start_date).toLocaleDateString("vi-VN")}
                </TableCell>
                <TableCell className="py-2 px-4 border">
                  {" "}
                  {new Date(item.end_date).toLocaleDateString("vi-VN")}
                </TableCell>
                <TableCell className="py-2 px-4 border">
                  {item1.product_name}
                </TableCell>
                <TableCell className="flex gap-3">
                  {" "}
                  <button className="p-2 text-white bg-red-500 hover:bg-red-600 rounded text-xl ">
                    <AiOutlineDelete />
                  </button>
                  <button className="p-2 text-white bg-blue-500 hover:bg-blue-600 rounded text-xl">
                    <FaRegEdit />
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default PageTest;
