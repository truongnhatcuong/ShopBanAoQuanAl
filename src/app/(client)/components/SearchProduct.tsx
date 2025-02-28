/* eslint-disable @next/next/no-img-element */
import { ForMatPrice } from "@/lib/FormPrice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { IoSearchSharp } from "react-icons/io5";

interface IProduct {
  product_id: number;
  product_name: string;
  price: number;
  Images: { image_url: string | any }[];
}

interface ISearchProps {
  search: string;
  setSearch: (value: string) => void;
}

const SearchProduct = ({ search, setSearch }: ISearchProps) => {
  const router = useRouter();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await fetch(`/api/product?search=${search}`);
      const data = await res.json();
      setProducts(data.product);
    };

    if (search.trim()) {
      fetchApi();
    } else {
      setProducts([]);
    }
  }, [search]);

  const handleSearch = (id: number) => {
    router.push(`/product/${id}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex flex-col" ref={dropdownRef}>
      <div className="relative md:flex items-center border rounded-full md:p-2 md:pl-4 px-3 py-1.5 dark:text-white">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          className="outline-none md:px-2 px-0 text-xs md:text-sm w-full"
        />
        <IoSearchSharp
          className={`text-xl md:text-2xl absolute right-2 top-2 cursor-pointer ${
            search === "" ? "text-gray-300" : "hover:text-gray-400"
          }`}
          aria-disabled={search === ""}
        />
      </div>

      {/* Dropdown Results */}
      {showDropdown && products.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white dark:bg-gray-800 border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          <div className="p-2">
            {products.map((product) => (
              <div
                key={product.product_id}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-lg"
                onClick={() => {
                  handleSearch(product.product_id);
                  setSearch(product.product_name);
                  setShowDropdown(false);
                }}
              >
                {/* Product Image */}
                {product.Images?.[0] && (
                  <div className="w-12 h-12 flex-shrink-0">
                    <img
                      src={product.Images[0].image_url}
                      alt={product.product_name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                )}

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate dark:text-white">
                    {product.product_name}
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    {ForMatPrice(product.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results Message */}
      {showDropdown && search && products.length === 0 && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white dark:bg-gray-800 border rounded-lg shadow-lg p-4 z-50">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Không tìm thấy sản phẩm
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchProduct;
