"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // import useRouter

interface ICategory {
  category_id: number;
  category_name: string;
}

interface ISideBarProps {
  onCategoryChange: (categoryId: number | null) => void; // Thay đổi kiểu categoryId là number hoặc null
  onPriceChange: (price: number) => void;
}

const SideBar = ({ onCategoryChange, onPriceChange }: ISideBarProps) => {
  const [price, setPrice] = useState<number>(0);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null); // Chỉ lưu một category_id
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter(); // Khởi tạo router
  const searchParams = useSearchParams();

  useEffect(() => {
    async function ApiCategories() {
      const res = await fetch("/api/categories");
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
  const handleChangPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
    onPriceChange(Number(e.target.value));
  };
  const handleCategoryChange = (categoryId: number) => {
    const newSelect = selectedCategory === categoryId ? null : categoryId;
    setSelectedCategory(newSelect);
    onCategoryChange(newSelect);
    router.push(newSelect ? `?category_id=${newSelect}` : `/product`);
  };

  return (
    <div className=" flex md:flex-col flex-row md:pb-0 pb-4 h-screen ">
      <div className="ml-4 ">
        <h2 className="text-xl font-bold mt-6">Giá</h2>
        <div className="text-black t-8">
          <input
            type="range"
            min={0}
            step={100000}
            max={1000000}
            className="accent-black h-1.5 w-44 range-input"
            defaultValue={price}
            onChange={handleChangPrice}
          />
          <p className="text-sm mt-1">
            {` ${price.toLocaleString()}đ - 1,000,000đ`}
          </p>
        </div>
      </div>
      <div className="ml-4">
        <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
          <h2 className="text-xl font-bold mt-2 flex items-center">
            Danh Mục{" "}
            <span className="text-lg ml-2 mt-0.5">{isOpen ? "-" : "+"}</span>
          </h2>
        </div>
        {isOpen && (
          <div className="space-y-2 mt-2 text-sm">
            {categories.map((item) => (
              <div key={item.category_id} className="space-y-2">
                <input
                  type="checkbox"
                  name="item.category_id"
                  checked={selectedCategory === item.category_id} // Kiểm tra xem danh mục đã được chọn chưa
                  onChange={() => handleCategoryChange(item.category_id)} // Chọn danh mục
                />
                {item.category_name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
