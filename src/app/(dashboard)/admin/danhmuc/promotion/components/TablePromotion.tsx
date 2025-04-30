import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import DeletePromotion from "./DeletePromotion";
interface IPromotion {
  promotion_id: number;
  discount: number;
  start_date: string;

  end_date: string;
  products: {
    product_name: string;
    images: { image_url: string }[];
  }[];
}

interface IProp {
  promotion: IPromotion[] | [];
  reloadData: () => void;
}

const TablePromotion = (props: IProp) => {
  return (
    <>
      <Table>
        <TableCaption>Danh Sách Sản Phẩm Khuyến Mãi</TableCaption>
        <TableHeader className="table-auto w-full text-left border-collapse bg-gray-900 ">
          <TableRow>
            <TableHead className="text-white">Giảm Giá (%)</TableHead>
            <TableHead className="text-white">Ngày Bắt Đầu</TableHead>
            <TableHead className="text-white">Ngày Kết Thúc</TableHead>
            <TableHead className="text-white">Tên Sản Phẩm</TableHead>
            <TableHead className="text-white">Hình Ảnh</TableHead>
            <TableHead className="text-white">Action</TableHead>
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
                <TableCell className="py-2 pl-5 border">
                  <Image
                    alt="ok"
                    src={item1.images[0].image_url}
                    width={50}
                    height={50}
                  />
                </TableCell>
                <TableCell className="flex gap-3">
                  {" "}
                  <DeletePromotion
                    id={item.promotion_id}
                    reloadData={props.reloadData}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default TablePromotion;
