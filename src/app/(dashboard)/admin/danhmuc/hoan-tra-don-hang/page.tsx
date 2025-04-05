"use client";
import React, { useEffect, useState } from "react";
import ReturnList from "./components/ReturnList";
import { toast } from "react-toastify";

export interface ReturnItem {
  return_id: number;
  order_id: number;
  product_id: number;
  return_reason: string | null;
  return_date: string;
  return_status: string;
  return_amount: number;
  Product: {
    product_name: string;
    Images: { image_url: string }[];
  };
  Order: {
    order_date: string;
    order_state: string;
    OrderItems: { quantity: number; Size: { name_size: string } }[];
  };
}

const Page = () => {
  const [returns, setReturns] = useState<ReturnItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReturns = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/returns`
      );
      if (!response.ok) throw new Error("Không thể lấy danh sách hoàn trả");
      const data = await response.json();
      setReturns(data.returns);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleUpdateStatus = async (
    returnId: number,
    status: "APPROVED" | "REJECTED"
  ) => {
    try {
      const response = await fetch(`/api/returns/${returnId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            `Không thể ${
              status === "APPROVED" ? "phê duyệt" : "từ chối"
            } yêu cầu`
        );
      }

      await fetchReturns(); // Cập nhật lại danh sách
      toast.success(
        `Yêu cầu đã được ${
          status === "APPROVED" ? "phê duyệt" : "từ chối"
        } thành công`
      );
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchReturns();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Quản lý hoàn trả sản phẩm</h1>
      <ReturnList returns={returns} onUpdateStatus={handleUpdateStatus} />
    </div>
  );
};

export default Page;
