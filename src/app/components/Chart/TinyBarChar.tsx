"use client";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface ICategory {
  category_name: string;
  _count: number;
}

const TinyPieChart = () => {
  const [data, setData] = useState<ICategory[] | []>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/categories");
      const data = await response.json();

      const formattedData = data.categories.map((item: any) => ({
        category_name: item.category_name,
        count: item._count.Products,
      }));
      setData(formattedData);
    };
    fetchData();
  }, []);

  // Mảng màu sắc sẽ được sử dụng cho từng phần trong biểu đồ
  const COLORS = [
    "#eb5e07",
    "#1d72b8",
    "#27ae60",
    "#f39c12",
    "#8e44ad",
    "#16a085",
  ];

  return (
    <div className="rounded-lg h-full">
      <h1 className="uppercase text-center text-gray-500 font-semibold text-sm">
        Số Lượng Sản Phẩm Danh Mục
      </h1>
      <ResponsiveContainer width={350} height={300}>
        <PieChart>
          <Tooltip
            cursor={{ fill: "#f0f0f0" }}
            contentStyle={{ backgroundColor: "#ffffff", borderRadius: "8px" }}
            formatter={(value: number) => `${value} sản phẩm`}
          />
          <Pie
            data={data}
            dataKey="count"
            nameKey="category_name"
            label={({ name, value, index }) => `${name}`}
            labelLine={false}
            outerRadius={80}
            innerRadius={50}
            isAnimationActive={false}
            cx="50%"
            cy="50%"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TinyPieChart;
