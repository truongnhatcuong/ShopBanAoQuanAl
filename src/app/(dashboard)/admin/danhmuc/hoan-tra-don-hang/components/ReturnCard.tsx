import React from "react";
import Image from "next/image";
import ReturnActions from "./ReturnActions";
import { ForMatPrice } from "@/lib/FormPrice"; // Giả sử bạn đã có hàm này
import { ReturnItem } from "../page";
import {
  OrderState,
  translateOrderState,
} from "../../order/components/TableOrder";

interface ReturnCardProps {
  returnItem: ReturnItem;
  onUpdateStatus: (returnId: number, status: "APPROVED" | "REJECTED") => void;
}

const ReturnCard = ({ returnItem, onUpdateStatus }: ReturnCardProps) => {
  const statusStyles = {
    PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
    APPROVED: "bg-green-100 text-green-800 border-green-300",
    COMPLETED: "bg-green-200 text-green-900 border-green-400",
    REJECTED: "bg-red-100 text-red-800 border-red-300",
  };

  const statusIcons = {
    PENDING: "⏳",
    APPROVED: "✅",
    COMPLETED: "🔄",
    REJECTED: "❌",
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Chờ xử lý";
      case "APPROVED":
        return "Đã phê duyệt";
      case "COMPLETED":
        return "Đã hoàn trả";
      case "REJECTED":
        return "Đã từ chối";
      default:
        return status;
    }
  };

  const currentStatus = returnItem.return_status as keyof typeof statusStyles;

  return (
    <div className="border rounded-lg p-4 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Hiển thị trạng thái ở trên cùng */}
      <div
        className={`mb-4 p-3 rounded-lg border ${
          statusStyles[currentStatus] ||
          "bg-gray-100 text-gray-800 border-gray-300"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">
            {statusIcons[currentStatus as keyof typeof statusIcons] || "❓"}
          </span>
          <span className="font-medium">
            Trạng thái: {getStatusText(returnItem.return_status)}
          </span>
        </div>
      </div>

      <div className="flex gap-4">
        {/* Hình ảnh sản phẩm */}
        <div className="flex-shrink-0">
          <Image
            width={100}
            height={100}
            src={returnItem.Product.Images[0]?.image_url || "/placeholder.jpg"}
            alt={returnItem.Product.product_name}
            className="w-24 h-24 object-cover rounded-md border border-gray-200"
          />
        </div>

        {/* Thông tin chi tiết */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {returnItem.Product.product_name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
            <p>
              <strong className="text-gray-900">Mã đơn hàng:</strong>{" "}
              {returnItem.order_id}
            </p>
            <p>
              <strong className="text-gray-900">Ngày yêu cầu:</strong>{" "}
              {new Date(returnItem.return_date).toLocaleDateString("vi-VN")}
            </p>
            <p>
              <strong className="text-gray-900">Ngày đặt hàng:</strong>{" "}
              {new Date(returnItem.Order.order_date).toLocaleDateString(
                "vi-VN"
              )}
            </p>
            <p>
              <strong className="text-gray-900">Lý do hoàn trả:</strong>{" "}
              {returnItem.return_reason || "Không có"}
            </p>
            <p>
              <strong className="text-gray-900">Số lượng:</strong>{" "}
              {returnItem.Order.OrderItems[0]?.quantity || "N/A"}
            </p>
            <p>
              <strong className="text-gray-900">Kích thước:</strong>{" "}
              {returnItem.Order.OrderItems[0]?.Size.name_size || "N/A"}
            </p>
            <p>
              <strong className="text-gray-900">Số tiền hoàn:</strong>{" "}
              <span className="text-red-600 font-medium">
                {ForMatPrice(returnItem.return_amount)}
              </span>
            </p>
            <p>
              <strong className="text-gray-900">Trạng thái đơn hàng:</strong>{" "}
              {translateOrderState(returnItem.Order.order_state as OrderState)}
            </p>
          </div>
        </div>
      </div>

      {/* Timeline trạng thái */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h3 className="font-medium text-gray-900 mb-2">Tiến trình xử lý</h3>
        <div className="flex justify-between">
          <div
            className={`text-center flex-1 ${
              currentStatus === "PENDING" ||
              currentStatus === "APPROVED" ||
              currentStatus === "COMPLETED" ||
              currentStatus === "REJECTED"
                ? "text-yellow-600 font-medium"
                : "text-gray-400"
            }`}
          >
            <div
              className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center ${
                currentStatus === "PENDING" ||
                currentStatus === "APPROVED" ||
                currentStatus === "COMPLETED" ||
                currentStatus === "REJECTED"
                  ? "bg-yellow-100 border-2 border-yellow-500"
                  : "bg-gray-100"
              }`}
            >
              1
            </div>
            <p className="mt-1 text-xs">Chờ xử lý</p>
          </div>

          <div
            className={`text-center flex-1 ${
              currentStatus === "APPROVED" || currentStatus === "COMPLETED"
                ? "text-green-600 font-medium"
                : "text-gray-400"
            }`}
          >
            <div
              className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center ${
                currentStatus === "APPROVED" || currentStatus === "COMPLETED"
                  ? "bg-green-100 border-2 border-green-500"
                  : "bg-gray-100"
              }`}
            >
              2
            </div>
            <p className="mt-1 text-xs">Đã phê duyệt</p>
          </div>

          <div
            className={`text-center flex-1 ${
              currentStatus === "COMPLETED"
                ? "text-green-700 font-medium"
                : "text-gray-400"
            }`}
          >
            <div
              className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center ${
                currentStatus === "COMPLETED"
                  ? "bg-green-200 border-2 border-green-600"
                  : "bg-gray-100"
              }`}
            >
              3
            </div>
            <p className="mt-1 text-xs">Đã hoàn trả</p>
          </div>

          <div
            className={`text-center flex-1 ${
              currentStatus === "REJECTED"
                ? "text-red-600 font-medium"
                : "text-gray-400"
            }`}
          >
            <div
              className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center ${
                currentStatus === "REJECTED"
                  ? "bg-red-100 border-2 border-red-500"
                  : "bg-gray-100"
              }`}
            >
              ✕
            </div>
            <p className="mt-1 text-xs">Đã từ chối</p>
          </div>
        </div>
      </div>

      {/* Nút hành động */}
      <div className="mt-6">
        <ReturnActions
          returnItem={returnItem}
          onUpdateStatus={onUpdateStatus}
        />
      </div>
    </div>
  );
};

export default ReturnCard;
