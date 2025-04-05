import React from "react";
import { ReturnItem } from "../page";
import ReturnCard from "./ReturnCard";

interface ReturnListProps {
  returns: ReturnItem[];
  onUpdateStatus: (returnId: number, status: "APPROVED" | "REJECTED") => void;
}

const ReturnList: React.FC<ReturnListProps> = ({ returns, onUpdateStatus }) => {
  return (
    <div className="grid gap-6">
      {returns.length === 0 ? (
        <p className="text-center">Chưa có yêu cầu hoàn trả nào.</p>
      ) : (
        returns.map((returnItem) => (
          <ReturnCard
            key={returnItem.return_id}
            returnItem={returnItem}
            onUpdateStatus={onUpdateStatus}
          />
        ))
      )}
    </div>
  );
};

export default ReturnList;
