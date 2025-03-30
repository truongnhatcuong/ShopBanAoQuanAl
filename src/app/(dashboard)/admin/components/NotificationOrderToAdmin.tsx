"use client";
import { ForMatPrice } from "@/lib/FormPrice";
import React, { useEffect, useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Pusher from "pusher-js";
import Link from "next/link";

interface Order {
  orderId: number;
  customerName: string;
  totalAmount: number;
}

const NotificationOrderToAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const pusher = new Pusher("9b679e252709e5316fa8", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("orders");
    channel.bind("new-order", (data: Order) => {
      setOrders((prevOrders) => [data, ...prevOrders]); // Add new order to the beginning of the list
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, []); // Empty dependency array

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <IoMdNotifications size={30} className="text-gray-700" />
        {orders.length > 0 && (
          <p className="absolute -top-1 right-0 border-2 border-white rounded-full bg-red-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center">
            {orders.length}
          </p>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-60 bg-white rounded-lg shadow-lg mt-3 z-40">
        <DropdownMenuLabel className="p-3 border-b text-lg font-semibold text-gray-800 ">
          <h1>📢 Thông báo đơn hàng</h1>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup className="cursor-pointer">
          {orders.length > 0 ? (
            orders.map((item, index) => (
              <Link href={"admin/danhmuc/order"} key={index}>
                <DropdownMenuItem className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <strong>{item.customerName}</strong> đã đặt hàng{" "}
                  {ForMatPrice(item.totalAmount)}
                </DropdownMenuItem>
              </Link>
            ))
          ) : (
            <DropdownMenuItem className="px-4 py-2 text-sm text-gray-500">
              Không có đơn hàng mới
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationOrderToAdmin;
