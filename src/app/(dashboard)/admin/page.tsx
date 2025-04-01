"use client";
import React, { useState, useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ForMatPrice } from "@/lib/FormPrice";
import SummaryCard from "./components/SummaryCard";
import DailyStatsChart from "./components/DailyStatsChart";
import OrdersCountChart from "./components/OrdersCountChart";
import OrderStatusChart from "./components/OrderStatusChart";
import CustomerGrowthChart from "./components/CustomerGrowthChart";
import TopProductsChart from "./components/TopProductsChart";

// Define TypeScript interfaces for our data structures
interface DailyStats {
  date: string;
  revenue: number;
  orderCount: number;
  formattedDate?: string;
}

interface OrderStatus {
  order_state: string;
  _count: {
    order_id: number;
  };
}

interface ProcessedOrderStatus {
  name: string;
  value: number;
}

interface TopProduct {
  productId: string;
  productName: string;
  quantity: number;
  revenue: number;
}

interface CustomerGrowth {
  date: string;
  newCustomers: number;
}

interface DashboardData {
  summary: {
    countOrder: number;
    totalAmount: number;
    customerCount: number;
    totalQuantity: number;
  };
  charts: {
    dailyStats: DailyStats[];
    ordersByStatus: OrderStatus[];
    topProducts: TopProduct[];
    customerGrowth: CustomerGrowth[];
  };
}

const DashboardCharts: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<"day" | "week" | "month" | "year">(
    "day"
  );

  // COLORS for pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/thongke?period=${period}`,
          {
            cache: "no-cache",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [period]);

  const handlePeriodChange = (newPeriod: "day" | "week" | "month" | "year") => {
    setPeriod(newPeriod);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        Đang tải dữ liệu...
      </div>
    );
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!data) return <div className="p-4">Không có dữ liệu</div>;

  // Format date for charts
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  // Process daily stats to ensure dates are formatted correctly
  const processedDailyStats = data.charts.dailyStats.map((item) => ({
    ...item,
    formattedDate: formatDate(item.date),
  }));

  // Process order status data for pie chart
  const processedOrderStatus: ProcessedOrderStatus[] =
    data.charts.ordersByStatus.map((item) => ({
      name: mapOrderStatus(item.order_state),
      value: item._count.order_id,
    }));

  // Map order status to Vietnamese
  function mapOrderStatus(status: string): string {
    const statusMap: Record<string, string> = {
      PENDING: "Chờ xử lý",
      PROCESSING: "Đang xử lý",
      DELIVERED: "Đã giao hàng",
      CANCELED: "Đã hủy",
      COMPLETED: "Hoàn thành",
    };
    return statusMap[status] || status;
  }

  return (
    <div className="space-y-8 mt-5">
      {/* Period selector */}
      <div className="flex space-x-2">
        <button
          onClick={() => handlePeriodChange("day")}
          className={`px-4 py-2 rounded ${
            period === "day" ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
        >
          Ngày
        </button>
        <button
          onClick={() => handlePeriodChange("week")}
          className={`px-4 py-2 rounded ${
            period === "week" ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
        >
          Tuần
        </button>
        <button
          onClick={() => handlePeriodChange("month")}
          className={`px-4 py-2 rounded ${
            period === "month" ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
        >
          Tháng
        </button>
        <button
          onClick={() => handlePeriodChange("year")}
          className={`px-4 py-2 rounded ${
            period === "year" ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
        >
          Năm
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* ........ */}
        <SummaryCard
          title="Tổng đơn hàng"
          description="Tổng số đơn hàng"
          value={data.summary.countOrder}
        />
        {/* ........ */}
        <SummaryCard
          title="Doanh Thu"
          description="Từ đơn hàng đã giao"
          value={ForMatPrice(data.summary.totalAmount)}
        />
        {/* ........ */}
        <SummaryCard
          title="Khách Hàng"
          description="Tổng số khách hàng"
          value={data.summary.customerCount}
        />
        {/* ........ */}
        <SummaryCard
          title="Đơn hàng đang xử lý"
          description="Số lượng sản phẩm"
          value={data.summary.totalQuantity}
        />
      </div>

      {/* Daily Statistics Line Chart */}
      <DailyStatsChart data={processedDailyStats} />

      {/* Orders Count Bar Chart */}
      <OrdersCountChart data={processedDailyStats} />

      {/* Orders by Status Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Trạng thái đơn hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <OrderStatusChart data={processedOrderStatus} colors={COLORS} />
          </CardContent>
        </Card>

        {/* Top Products Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Top sản phẩm bán chạy</CardTitle>
          </CardHeader>
          <CardContent>
            <TopProductsChart data={data.charts.topProducts} />
          </CardContent>
        </Card>
      </div>

      {/* Customer Growth Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Tăng trưởng khách hàng</CardTitle>
        </CardHeader>
        <CardContent>
          {" "}
          <CustomerGrowthChart data={data.charts.customerGrowth} />
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;
