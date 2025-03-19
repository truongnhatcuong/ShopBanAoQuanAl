import React from "react";
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
import { ForMatPrice } from "@/lib/FormPrice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DailyStatsChartProps {
  data: any[];
}

const DailyStatsChart = ({ data }: DailyStatsChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Doanh thu theo thời gian</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="formattedDate" />
              <YAxis />
              <Tooltip
                formatter={(value: number, name: string) => [
                  name === "revenue" ? ForMatPrice(value) : value,
                  name === "revenue" ? "Doanh thu" : "Số đơn hàng",
                ]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                name="Doanh thu"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyStatsChart;
