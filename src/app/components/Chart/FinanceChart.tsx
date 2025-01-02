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
        // Lấy dữ liệu 7 ngày gần nhất
        const promises = [];
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const formattedDate = date.toISOString().split("T")[0];

          promises.push(
            fetch(`/api/admin/thongke?date=${formattedDate}`)
              .then((res) => res.json())
              .then((result) => ({
                date: new Date(result.date).toLocaleDateString("vi-VN"),
                orders: result.count,
              }))
          );
        }

        const results = await Promise.all(promises);
        setData(results);
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
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrderLineChart;
