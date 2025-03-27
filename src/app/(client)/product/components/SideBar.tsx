"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // import useRouter

interface ICategory {
  category_id: number;
  category_name: string;
}

interface ISideBarProps {
  onPriceChange: (price: number) => void;
}
const SideBar = ({ onPriceChange }: ISideBarProps) => {
  const [price, setPrice] = useState<number>(0);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null); // Chỉ lưu một category_id
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    async function ApiCategories() {
      const res = await fetch("/api/categories", {
        next: { revalidate: 300 },
      });
      const data = await res.json();
      setCategories(data.categories);
    }
    ApiCategories();
  }, []);

  useEffect(() => {
    const categoryId = searchParams.get("category_id");
    if (categoryId) {
      setSelectedCategory(Number(categoryId));
    } else {
      setSelectedCategory(null);
    }
  }, [searchParams]);

  // input range
  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
    onPriceChange(Number(e.target.value));
  };
  const handleCategoryChange = (categoryId: number) => {
    const newSelect = selectedCategory === categoryId ? null : categoryId;
    setSelectedCategory(newSelect);

    router.push(newSelect ? `?category_id=${newSelect}` : `/product`);
  };

  return (
    <div className="flex flex-col items-center mt-7 h-screen w-full  p-6">
      {/* Bộ lọc Giá */}
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-2">Giá</h2>
        <input
          type="range"
          min={0}
          max={1000000}
          step={100000}
          value={price}
          onChange={handleChangePrice}
          className="w-56 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-black "
        />
        <p className="text-sm mt-2 text-gray-700 font-medium">
          {price.toLocaleString()}đ - 1,000,000đ
        </p>
      </div>

      {/* Danh mục sản phẩm */}
      <div className="bg-white p-6 mt-6 rounded-lg shadow-lg text-center w-full max-w-md">
        <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
          <h2 className="text-2xl font-bold my-2 flex  items-center">
            Danh Mục{" "}
            <span className="text-lg ml-2 mt-0.5">{isOpen ? "-" : "+"}</span>
          </h2>
        </div>

        {isOpen && (
          <div className="space-y-3 mt-2 text-lg">
            {categories.map((item) => (
              <label
                key={item.category_id}
                className="flex items-center  gap-2"
              >
                <input
                  type="checkbox"
                  checked={selectedCategory === item.category_id}
                  onChange={() => handleCategoryChange(item.category_id)}
                />
                {item.category_name}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
