import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface ISelect {
  setFillterState: (value: any) => void;
  OrderState: any;
}
enum OrderState {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

const SelectOrderStatus = ({ OrderState, setFillterState }: ISelect) => {
  return (
    <div className="flex  justify-end  mt-3 mr-36">
      <Select onValueChange={(e) => setFillterState(e as OrderState | "ALL")}>
        <SelectTrigger className="w-36 border border-gray-300 rounded-lg px-3 py-2 shadow-md bg-white hover:bg-gray-100 focus:ring-2 focus:ring-blue-400">
          <SelectValue placeholder="Lọc theo trạng thái" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-lg w-[160px]">
          <SelectItem
            className="px-3 py-2 hover:bg-gray-200 cursor-pointer "
            value="ALL"
          >
            🟢 Tất Cả
          </SelectItem>
          <SelectItem
            className="px-3 py-2 hover:bg-gray-200 cursor-pointer text-red-600"
            value={OrderState.PENDING}
          >
            🔴 PENDING
          </SelectItem>
          <SelectItem
            className="px-3 py-2 hover:bg-gray-200 cursor-pointer  text-yellow-600"
            value={OrderState.PROCESSING}
          >
            🟡 PROCESSING
          </SelectItem>
          <SelectItem
            className="px-3 py-2 hover:bg-gray-200 cursor-pointer  text-blue-600"
            value={OrderState.SHIPPED}
          >
            🔵 SHIPPED
          </SelectItem>
          <SelectItem
            className="px-3 py-2 hover:bg-gray-200 cursor-pointer  text-green-600"
            value={OrderState.DELIVERED}
          >
            🟢 DELIVERED
          </SelectItem>
          <SelectItem
            className="px-3 py-2 hover:bg-gray-200 cursor-pointer  text-gray-600"
            value={OrderState.CANCELLED}
          >
            ⚫ CANCELLED
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectOrderStatus;
