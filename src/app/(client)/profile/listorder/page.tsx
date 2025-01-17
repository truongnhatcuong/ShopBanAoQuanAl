/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import CancellOrder from "../components/CancellOrder";
import { useRouter } from "next/navigation";
import { ForMatPrice } from "@/lib/FormPrice";

interface Brand {
  brand_name: string;
  description: string;
}

interface Size {
  name_size: string;
}

interface Image {
  image_url: string;
}

interface Product {
  product_name: string;
  description: string;
  price: string;
  stock_quantity: number;
  color: string;
  Brand: Brand;
  Images: Image[];
}

interface OrderItem {
  quantity: number;
  price: string;
  Product: Product;
  Size: Size;
}

interface Order {
  order_id: number;
  total_amount: string;
  order_state: string;
  OrderItems: OrderItem[];
}
enum OrderState {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

const PageListOrder = () => {
  const [orderList, setOrderList] = useState<Order[] | null>(null);
  const route = useRouter();

  const orderStateText: { [key in OrderState]: string } = {
    PENDING: "Chờ xử lý",
    PROCESSING: "Đang xử lý",
    SHIPPED: "Đang gửi hàng",
    DELIVERED: "Đã giao",
    CANCELLED: "Đã hủy",
  };

  const orderStateClasses: { [key in OrderState]: string } = {
    PENDING: "text-red-700 ",
    PROCESSING: "text-yellow-700 ",
    SHIPPED: "text-blue-700 ",
    DELIVERED: "text-green-700 ",
    CANCELLED: "text-red-700 ",
  };
  const fetchData = async () => {
    try {
      const response = await fetch("/api/order");
      const data = await response.json();
      setOrderList(data.orders); // Lưu toàn bộ danh sách đơn hàng.
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (!orderList) {
    return <div className="text-center ">bạn chưa có đơn nào !</div>;
  }

  return (
    <div className="overflow-auto h-full">
      <div className="h-full ">
        {orderList.map((order) => (
          <div
            key={order.order_id}
            className="w-full max-w-2xl mx-auto p-2 mb-8 border"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center space-x-2">
                <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">
                  Chat
                </button>
                <button
                  className="border px-3 py-1 rounded text-sm"
                  onClick={() => route.push("/product")}
                >
                  Xem Shop
                </button>
              </div>
              <span
                className={`${
                  orderStateClasses[order.order_state as OrderState]
                }`}
              >
                {orderStateText[order.order_state as OrderState]}
              </span>
            </div>

            {/* Order Items */}
            {order.OrderItems?.map((item, index) => (
              <div
                className="flex gap-4 py-2 border-b items-center"
                key={index}
              >
                <img
                  src={item.Product.Images[0]?.image_url}
                  alt="Product"
                  className="w-20 h-20 object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-sm">
                    {item.Product.product_name}
                  </h3>
                  <p className="text-gray-600 dark:text-white">
                    Phân loại hàng: {item.Size.name_size}
                  </p>
                  <p>x{item.quantity}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-sm">
                    {ForMatPrice(Number(item.price))}
                  </span>
                </div>
              </div>
            ))}

            {/* Total and Actions */}
            <div className="flex justify-between py-3">
              <span>Số tiền phải trả:</span>
              <span className="text-red-500 text-lg">
                {ForMatPrice(Number(order.total_amount))}
              </span>
            </div>
            <div className="flex justify-end gap-2">
              <button className="border px-4 py-2 rounded text-sm">
                Liên Hệ Người Bán
              </button>
              {(order.order_state === OrderState.PENDING ||
                order.order_state === OrderState.PROCESSING) && (
                <CancellOrder orderId={order.order_id} reloadData={fetchData} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageListOrder;
