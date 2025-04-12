"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import OrderTabs from "./components/OrderTabs";
import OrderItem from "./components/OrderItem";
import OrderCard from "./components/OrderCard";
import { toast } from "react-toastify";
import ReturnModal from "./components/ReturnModal";
import {
  OrderState,
  translateOrderState,
} from "@/app/(dashboard)/admin/danhmuc/order/components/TableOrder";
import { div } from "@tensorflow/tfjs";
import Link from "next/link";

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
  product_id: number;
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

const PageListOrder = () => {
  const [orderList, setOrderList] = useState<Order[] | []>([]);
  const [activeTab, setActiveTab] = useState<OrderState>(OrderState.PENDING);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [returnReason, setReturnReason] = useState<string>("");

  const handleOpenReturnModal = (order: any) => {
    setSelectedOrder(order);
    setIsReturnModalOpen(true);
  };
  const handleCloseReturnModal = () => {
    setSelectedOrder(null);
    setIsReturnModalOpen(false);
    setSelectedProductId(null);
    setReturnReason("");
  };
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/order`,
        { cache: "no-cache" }
      );
      const data = await response.json();
      setOrderList(data.orders);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReturnRequest = async (productId: number, reason: string) => {
    if (!selectedOrder || !productId || !reason) {
      alert("Vui lòng chọn sản phẩm và nhập lý do hoàn trả!");
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/returns`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_id: selectedOrder.order_id,
            product_id: productId,
            return_reason: reason,
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success("Yêu cầu hoàn trả đã được gửi thành công!");
        fetchData();
        handleCloseReturnModal();
      }
    } catch (error: any) {
      console.error("Error submitting return request:", error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  if (!orderList || orderList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <div className="text-2xl font-semibold text-green-600">
          Bạn chưa có đơn hàng nào
        </div>
        <Link href={"/product"}>
          {" "}
          <div className="mt-4 text-base text-blue-600 hover:underline hover:text-blue-800 cursor-pointer transition">
            Mua ngay
          </div>
        </Link>
      </div>
    );
  }

  const filteredOrders = (orderList || []).filter(
    (order) => order.order_state === activeTab
  );

  const hasOrders = filteredOrders.length ? filteredOrders.length > 0 : null;

  return (
    <div className="flex flex-col h-screen  ">
      {/* Tab Navigation - Fixed at top */}
      <OrderTabs
        activeTab={activeTab}
        orderList={orderList}
        setActiveTab={setActiveTab}
      />

      {/* Orders List - Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-4 ">
        {!hasOrders ? (
          <div className="text-center py-8">
            Không có đơn hàng nào trong trạng thái{" "}
            {translateOrderState(activeTab).toLowerCase().replace("_", " ")}
          </div>
        ) : (
          <div className="px-4">
            {filteredOrders.map((order, index) => (
              <OrderCard
                fetchData={fetchData}
                onOpenReturnModal={handleOpenReturnModal}
                order={order}
                key={index}
              />
            ))}
          </div>
        )}
      </div>
      <ReturnModal
        isOpen={isReturnModalOpen}
        order={selectedOrder}
        onClose={handleCloseReturnModal}
        onSubmit={handleReturnRequest}
        selectedProductId={selectedProductId}
        setSelectedProductId={setSelectedProductId}
        returnReason={returnReason}
        setReturnReason={setReturnReason}
      />
    </div>
  );
};

export default PageListOrder;
