import React, { useCallback, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import SelectOrderStatus from "./SelectOrderStatus";
import { toast } from "react-toastify";
import DetailOrder from "./DetailOrder";
import { ForMatPrice } from "@/lib/FormPrice";

interface IOrder {
  order_id: number;
  order_date: string;
  total_amount: number;
  order_state: string;
  Customer: { name: string; email: string };
  Payments: {
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
enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

const translatePaymentStatus = (value: PaymentStatus): string => {
  switch (value) {
    case PaymentStatus.PENDING:
      return "CHỜ THANH TOÁN";
    case PaymentStatus.COMPLETED:
      return "ĐÃ THANH TOÁN";
    case PaymentStatus.FAILED:
      return "THANH TOÁN THẤT BẠI";
    case PaymentStatus.REFUNDED:
      return "ĐÃ HOÀN TIỀN";
    default:
      return value;
  }
};

const translateOrderState = (value: OrderState): string => {
  switch (value) {
    case OrderState.PENDING:
      return "ĐANG CHỜ";
    case OrderState.PROCESSING:
      return "ĐANG XỬ LÝ";
    case OrderState.SHIPPED:
      return "ĐÃ GIAO HÀNG";
    case OrderState.DELIVERED:
      return "ĐÃ NHẬN HÀNG";
    case OrderState.CANCELLED:
      return "ĐÃ HỦY";
    default:
      return value;
  }
};
const PageListOrder = ({ orders, reloadData }: IProps) => {
  const [filterState, setFilterState] = useState<OrderState | "ALL">("ALL");

  const orderStateClasses: { [key in OrderState]: string } = {
    PENDING: "text-red-700 bg-red-200",
    PROCESSING: "text-yellow-700 bg-yellow-200",
    SHIPPED: "text-blue-700 bg-blue-200",
    DELIVERED: "text-green-700 bg-green-200",
    CANCELLED: "text-white bg-black",
  };

  const paymentStatusClasses: { [key in PaymentStatus]: string } = {
    PENDING: "text-red-700 bg-red-200",
    COMPLETED: "text-green-700 bg-green-200",
    FAILED: "text-red-700 bg-red-200",
    REFUNDED: "text-blue-700 bg-blue-200",
  };

  // Hàm cập nhật trạng thái đơn hàng và thanh toán
  const handleUpdate = async (
    orderId: number,
    order_state: string,
    payment_status: string
  ) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/manage/orderCustomer/${orderId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order_state, payment_status }),
        }
      );

      if (res.ok) {
        toast.success("Cập nhật thành công");

        // Gửi email thông báo
        const resEmail = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subject: "Cập nhật trạng thái đơn hàng",
            message: `[Thông báo đơn hàng]  
            Kính gửi Quý khách,  
          
            Đơn hàng #${orderId} của bạn đã được cập nhật vào lúc ${new Date().toLocaleString(
              "vi-VN"
            )}. Dưới đây là thông tin chi tiết:  
          
            - **Mã đơn hàng**: #${orderId}  
            - **Trạng thái đơn hàng**: ${translateOrderState(
              order_state as OrderState
            )}  
            - **Trạng thái thanh toán**: ${translatePaymentStatus(
              payment_status as PaymentStatus
            )} 
          
            Vui lòng kiểm tra chi tiết đơn hàng trên hệ thống của chúng tôi tại [liên kết hệ thống]. Nếu bạn có bất kỳ thắc mắc nào, hãy liên hệ với bộ phận hỗ trợ khách hàng qua email: support@company.com hoặc số hotline: 1900-1234.  
          
            Trân trọng,  
            Trương Nhật Cường`,
          }),
        });
        if (!resEmail.ok) {
          toast.error("gửi email thông báo thất bại!");
        } else {
          toast.success("Đã gửi email thông báo!");
        }

        reloadData();
      } else {
        toast.error("Cập nhật thất bại");
      }
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      toast.error("Cập nhật thất bại");
    }
  };

  return (
    <>
      <SelectOrderStatus
        OrderState={OrderState}
        setFillterState={setFilterState}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mã đơn Hàng</TableHead>
            <TableHead>Khách Hàng</TableHead>
            <TableHead>Ngày Đặt</TableHead>
            <TableHead>Trạng thái thanh toán</TableHead>
            <TableHead>Tổng Tiền</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Trạng thái đơn hàng</TableHead>

            <TableHead>Hành Động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders
            .filter(
              (item) =>
                filterState === "ALL" || item.order_state === filterState
            )
            .map((item) => {
              // Lấy payment status hiện tại
              const currentPaymentStatus =
                item.Payments && item.Payments.length > 0
                  ? item.Payments[0].payment_status
                  : "PENDING";

              return (
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
                    {/* Payment Status Select */}
                    <Select
                      defaultValue={currentPaymentStatus}
                      onValueChange={(value) => {
                        handleUpdate(item.order_id, item.order_state, value);
                      }}
                    >
                      <SelectTrigger
                        className={`w-28 text-xs h-8 ${
                          paymentStatusClasses[
                            currentPaymentStatus as PaymentStatus
                          ] || "text-gray-700 bg-gray-200"
                        }`}
                      >
                        <SelectValue placeholder="Trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(PaymentStatus).map((status) => (
                          <SelectItem key={status} value={status}>
                            {translatePaymentStatus(status as PaymentStatus)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{ForMatPrice(item.total_amount)}</TableCell>
                  <TableCell>
                    {item.Payments && item.Payments.length > 0
                      ? item.Payments[0].payment_method
                      : "CASH"}
                  </TableCell>
                  <TableCell>
                    {/* Order Status Select */}
                    <Select
                      defaultValue={item.order_state}
                      onValueChange={(value) => {
                        handleUpdate(
                          item.order_id,
                          value,
                          currentPaymentStatus
                        );
                      }}
                    >
                      <SelectTrigger
                        className={`w-28 text-xs h-8 ${
                          orderStateClasses[item.order_state as OrderState]
                        }`}
                      >
                        <SelectValue placeholder="Trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(OrderState).map((status) => (
                          <SelectItem key={status} value={status}>
                            {translateOrderState(status as OrderState)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="flex justify-center">
                    <DetailOrder orderId={item.order_id} />
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </>
  );
};

export default PageListOrder;
