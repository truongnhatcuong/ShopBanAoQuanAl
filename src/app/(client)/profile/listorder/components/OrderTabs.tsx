import React from "react";

export enum OrderState {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

interface IOrderTabsProps {
  activeTab: OrderState;
  setActiveTab: (state: OrderState) => void;
  orderList: { order_state: string }[];
}
const orderStateText: { [key in OrderState]: string } = {
  PENDING: "Chờ xử lý",
  PROCESSING: "Đang xử lý",
  SHIPPED: "Đang gửi hàng",
  DELIVERED: "Đã giao",
  CANCELLED: "Đã hủy",
};

const orderStateClasses: { [key in OrderState]: string } = {
  PENDING: "text-red-700",
  PROCESSING: "text-yellow-700",
  SHIPPED: "text-blue-700",
  DELIVERED: "text-green-700",
  CANCELLED: "text-red-700",
};
const OrderTabs = ({ activeTab, orderList, setActiveTab }: IOrderTabsProps) => {
  return (
    <div className="flex border-y mb-4 bg-white sticky top-0 z-10 overflow-x-auto">
      {Object.values(OrderState).map((state) => (
        <button
          key={state}
          className={`px-4 py-2 whitespace-nowrap ${
            activeTab === state
              ? `border-b-2 font-medium ${orderStateClasses[state]}`
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab(state)}
        >
          {orderStateText[state]}
          <span className="ml-1">
            {orderList.filter((order) => order.order_state === state).length > 0
              ? orderList.filter((order) => order.order_state === state).length
              : ""}
          </span>
        </button>
      ))}
    </div>
  );
};

export default OrderTabs;
