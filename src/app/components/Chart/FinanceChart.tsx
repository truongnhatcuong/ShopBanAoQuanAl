import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface ChartData {
  date: string;
  orders: number;
}

const OrderLineChart = () => {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi API để lấy dữ liệu cho 7 ngày gần nhất
        const response = await fetch("/api/admin/thongke");
        const result = await response.json();

        const formattedData = [
          {
            date: new Date(result.startDate).toLocaleDateString("vi-VN"),
            orders: result.count,
          },
          // Thêm logic cho dữ liệu từng ngày nếu cần thiết
        ];

        setData(formattedData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-[400px]">
      <h1 className="uppercase text-center text-gray-500 font-semibold text-sm mb-2">
        Thống kê đơn hàng 7 ngày gần nhất
      </h1>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="orders"
            name="Số đơn hàng"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          {/* Thêm đường tham chiếu màu tím */}
          <ReferenceLine y={10} stroke="purple" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrderLineChart;
