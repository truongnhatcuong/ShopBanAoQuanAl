import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import Modal from "react-modal";
import { VscChromeClose } from "react-icons/vsc";
import { toast } from "react-toastify";

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
  orders: IOrder;
  reloadData: () => void;
}

enum OrderState {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}
enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

const UpdateOrder = ({ orders, reloadData }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [order_state, setOrder_state] = useState(orders.order_state);
  const [payment_status, setPaymentStatus] = useState(
    orders.Payments && orders.Payments.length > 0
      ? orders.Payments[0].payment_status
      : "PENDING"
  );
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handleUpdate = async () => {
    const res = await fetch(
      `/api/admin/manage/orderCustomer/${orders.order_id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_state, payment_status }),
      }
    );
    if (res.ok) {
      toast.success("cập nhật thành công");
      reloadData();
      setIsOpen(false);
    } else {
      toast.error("cập nhật thấy bại");
    }
  };

  return (
    <>
      <button
        className="p-2 text-white bg-blue-500 hover:bg-blue-600 rounded transition-all duration-200"
        onClick={() => setIsOpen(true)}
      >
        <FaRegEdit className="w-5 h-5" />
      </button>

      <Modal
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={() => setIsOpen(false)}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl mx-auto overflow-auto max-h-screen"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="relative">
          {/* Header */}
          <div className="flex justify-between items-center mb-4 pb-1.5 border-b">
            <h2 className="text-2xl font-bold text-gray-800">
              Chi Tiết Đơn Hàng
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
            >
              <VscChromeClose className="w-5 h-5" />
            </button>
          </div>

          {/* Order Information */}
          <div className="grid grid-cols-2 gap-6 mb-3">
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="text-sm text-gray-500 block mb-1">
                Mã Đơn Hàng
              </label>
              <div className="text-lg font-medium">#{orders.order_id}</div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <label className="text-sm text-gray-500 block mb-1">
                Trạng Thái đơn hàng
              </label>
              <select
                value={order_state}
                onChange={(e) => setOrder_state(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              >
                {Object.values(OrderState).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <label className="text-sm text-gray-500  mb-1">Khách Hàng</label>
              <div className="text-lg font-medium">{orders.Customer.name}</div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <label className="text-sm text-gray-500  mb-1">Ngày Đặt</label>
              <div className="text-lg font-medium">
                {new Date(orders.order_date).toLocaleDateString("vi-VN")}
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <label className="text-sm text-gray-500 ">
                Phương Thức Thanh Toán
              </label>
              <div className="text-sm font-medium mt-5">
                {orders.Payments && orders.Payments.length > 0
                  ? orders?.Payments[0].payment_method
                  : "CASH"}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="text-sm text-gray-500  mb-1">
                Trang Thái Thanh Toán
              </label>
              <select
                value={payment_status}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              >
                {Object.values(PaymentStatus).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Payment Information */}
          <div className="mb-5">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4 pb-2 border-b">
                <span className="text-gray-600">Tổng tiền:</span>
                <span className="text-lg font-medium">
                  {formatCurrency(orders.total_amount)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={() => setIsOpen(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              Đóng
            </button>
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
              onClick={handleUpdate}
            >
              Cập Nhật
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UpdateOrder;
