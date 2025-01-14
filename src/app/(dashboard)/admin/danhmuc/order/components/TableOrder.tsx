import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import UpdateOrder from "./UpdateOrder";

interface IOrder {
  order_id: number;
  order_date: string;
  total_amount: number;
  order_state: string;
  Customer: { name: string };
  Payments?: {
    payment_id: number;
    payment_status: string;
    payment_method: string;
  }[];
}
interface IProps {
  orders: IOrder[];
  reloadData: () => void;
}

enum OrderState {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

const PageListOrder = ({ orders, reloadData }: IProps) => {
  const orderStateClasses: { [key in OrderState]: string } = {
    PENDING: "text-red-700 bg-red-200",
    PROCESSING: "text-yellow-700 bg-yellow-200",
    SHIPPED: "text-blue-700 bg-blue-200",
    DELIVERED: "text-green-700 bg-green-200",
    CANCELLED: "text-red-700 bg-red-200",
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order_ID</TableHead>
            <TableHead>Khách Hàng</TableHead>
            <TableHead>Ngày Đặt</TableHead>
            <TableHead>Payment Status </TableHead>
            <TableHead>Tổng Tiền</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>order Status </TableHead>
            <TableHead>Hành Động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders
            .filter((item) => item.order_state !== OrderState.DELIVERED)

            .map((item) => (
              <TableRow
                key={item.order_id}
                className="odd:bg-gray-100 even:bg-white text-sm"
              >
                <TableCell>{item.order_id}</TableCell>
                <TableCell>{item.Customer.name}</TableCell>
                <TableCell>
                  {new Date(item.order_date).toLocaleDateString("vi-VN")}
                </TableCell>
                <TableCell>
                  <span
                    className={`p-1.5 text-xs ml-5 ${
                      item.Payments &&
                      item.Payments.length > 0 &&
                      item.Payments[0].payment_status === "COMPLETED"
                        ? "text-green-700 bg-green-200"
                        : "text-red-500 bg-red-200"
                    }`}
                  >
                    {item.Payments && item.Payments.length > 0
                      ? item.Payments[0].payment_status
                      : "PENDING"}
                  </span>
                </TableCell>
                <TableCell>{formatCurrency(item.total_amount)}</TableCell>
                <TableCell>
                  {item.Payments && item.Payments.length > 0
                    ? item.Payments[0].payment_method
                    : "CASH"}
                </TableCell>
                <TableCell>
                  <span
                    className={`${
                      orderStateClasses[item.order_state as OrderState]
                    } p-1.5 text-xs ml-5`}
                  >
                    {item.order_state}
                  </span>
                </TableCell>
                <TableCell className="flex justify-center">
                  <div>
                    <UpdateOrder orders={item} reloadData={reloadData} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default PageListOrder;
