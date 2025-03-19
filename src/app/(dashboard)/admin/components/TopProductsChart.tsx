import { ForMatPrice } from "@/lib/FormPrice";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface TopProductsChartProps {
  data: any[];
}

const TopProductsChart = ({ data }: TopProductsChartProps) => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis
            type="category"
            dataKey="productName"
            tick={{ fontSize: 12 }}
            width={150}
          />
          <Tooltip
            formatter={(value: number, name: string) => [
              name === "revenue" ? ForMatPrice(value) : value,
              name === "quantity" ? "Số lượng" : "Doanh thu",
            ]}
          />
          <Legend />
          <Bar dataKey="quantity" name="Số lượng" fill="#8884d8" />
          <Bar dataKey="revenue" name="Doanh thu" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopProductsChart;
