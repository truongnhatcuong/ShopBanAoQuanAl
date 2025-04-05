import {
  OrderState,
  orderStateClasses,
  translateOrderState,
} from "@/app/(dashboard)/admin/danhmuc/order/components/TableOrder";
import React from "react";

interface IOrderTabsProps {
  activeTab: OrderState;
  setActiveTab: (state: OrderState) => void;
  orderList: { order_state: string }[];
}

const OrderTabs = ({ activeTab, orderList, setActiveTab }: IOrderTabsProps) => {
  return (
    <div className="flex border-y mb-4 bg-white sticky top-0 z-10 overflow-x-auto">
      {Object.values(OrderState).map((state) => (
        <button
          key={state}
          className={`px-4 py-2 whitespace-nowrap ${
            activeTab === state
              ? `border-b-2 font-medium ${orderStateClasses[state]}`
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab(state)}
        >
          {translateOrderState(state)}
          {orderList.filter((order) => order.order_state === state).length >
            0 && (
            <span className="ml-1 px-2 py-0.5 bg-gray-200 text-gray-800 rounded-full text-xs">
              {orderList.filter((order) => order.order_state === state).length}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default OrderTabs;
