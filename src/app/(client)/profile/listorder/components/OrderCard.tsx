import React from "react";
import { OrderState } from "./OrderTabs";
import { useRouter } from "next/navigation";
import OrderItem from "./OrderItem";
import { ForMatPrice } from "@/lib/FormPrice";
import RiviewProduct from "../../components/RiviewProduct";
import CancellOrder from "../../components/CancellOrder";

interface IOrderCard {
  order: {
    order_id: number;
    total_amount: string;
    order_state: string;
    OrderItems: {
      product_id: number;
      quantity: number;
      price: string;
      Product: { product_name: string; Images: { image_url: string }[] };
      Size: { name_size: string };
    }[];
  };
  fetchData: () => void;
  onOpenReturnModal: (order: any) => void;
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

const OrderCard = ({ order, fetchData, onOpenReturnModal }: IOrderCard) => {
  const router = useRouter();
  return (
    <div className="w-full max-w-6xl mx-auto p-2 mb-8 border bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-2">
        <div className="flex items-center  space-x-2">
          <button
            className="border px-3 py-1 rounded text-sm"
            onClick={() => router.push("/product")}
          >
            Xem Shop
          </button>
        </div>
        <span
          className={`${orderStateClasses[order.order_state as OrderState]}`}
        >
          {orderStateText[order.order_state as OrderState]}
        </span>
      </div>
      {/* Order Items */}
      {order.OrderItems?.map((item, index) => (
        <OrderItem item={item} key={index} />
      ))}
      <div className="flex justify-between py-3">
        <span>Số tiền phải trả:</span>
        <span className="text-red-500 text-lg">
          {ForMatPrice(Number(order.total_amount))}
        </span>
      </div>
      <div className="flex justify-end gap-2 ">
        {order.order_state === OrderState.DELIVERED && (
          <RiviewProduct order_id={order.order_id} />
        )}
        {order.order_state === OrderState.CANCELLED ? (
          <>
            <button
              className="border px-4 py-2 rounded text-sm"
              onClick={() =>
                router.push(`/product/${order.OrderItems[0].product_id}`)
              }
            >
              Mua Lại
            </button>
          </>
        ) : order.order_state === OrderState.DELIVERED ? (
          <>
            <button
              className="border px-4 py-2 rounded text-sm"
              onClick={() => onOpenReturnModal(order)}
            >
              Hoàn Trả
            </button>
          </>
        ) : (
          <>
            <button className="border px-4 py-2 rounded text-sm">
              Liên Hệ Người Bán
            </button>
          </>
        )}
        {(order.order_state === OrderState.PENDING ||
          order.order_state === OrderState.PROCESSING) && (
          <CancellOrder orderId={order.order_id} reloadData={fetchData} />
        )}
      </div>
    </div>
  );
};

export default OrderCard;
