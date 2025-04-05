import React from "react";
import { ReturnItem } from "../page";

interface ReturnActionsProps {
  returnItem: ReturnItem;
  onUpdateStatus: (returnId: number, status: "APPROVED" | "REJECTED") => void;
}

const ReturnActions: React.FC<ReturnActionsProps> = ({
  returnItem,
  onUpdateStatus,
}) => {
  if (returnItem.return_status !== "PENDING") return null;

  return (
    <div className="mt-4 flex justify-end gap-2">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={() => onUpdateStatus(returnItem.return_id, "APPROVED")}
      >
        Phê duyệt
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={() => onUpdateStatus(returnItem.return_id, "REJECTED")}
      >
        Từ chối
      </button>
    </div>
  );
};

export default ReturnActions;
