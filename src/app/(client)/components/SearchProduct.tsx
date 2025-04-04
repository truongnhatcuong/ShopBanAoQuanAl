/* eslint-disable @next/next/no-img-element */
import { ForMatPrice } from "@/lib/FormPrice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TfiSearch } from "react-icons/tfi";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product?search=${search}`
      );
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
    setIsModalOpen(false);
    setShowDropdown(false);
  };

  return (
    <>
      {/* Main Search Container */}
      <div className="relative flex items-center w-full">
        {/* Desktop View: Input + Icon */}
        <div className="hidden md:flex relative flex-1 items-center border rounded-md p-2.5 pl-3 dark:text-white">
          <input
            type="text"
            placeholder="bạn tìm kiếm gì..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            className="outline-none px-1 text-sm w-[90%] bg-transparent"
          />
          <TfiSearch
            className={`text-2xl absolute right-2 top-2.5 cursor-pointer ${
              search === "" ? "text-gray-300" : "hover:text-gray-400"
            }`}
          />
        </div>

        {/* Mobile View: Icon Only */}
        <div className="md:hidden flex items-center">
          <TfiSearch
            className="text-2xl cursor-pointer"
            onClick={() => {
              setIsModalOpen(!isModalOpen);
              setShowDropdown(true);
            }}
          />
        </div>

        {/* Dropdown Results for Desktop */}
        {showDropdown && search !== "" && products.length > 0 && (
          <div className="absolute top-full left-0 w-full mt-1 bg-white dark:bg-gray-800 border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50 md:w-full hidden md:block ">
            <div className="p-2">
              {products.map((product) => (
                <div
                  key={product.product_id}
                  className="md:flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-lg "
                  onClick={() => {
                    handleSearch(product.product_id);
                    setSearch(product.product_name);
                  }}
                >
                  {product.Images?.[0] && (
                    <div className="w-12 h-12 flex-shrink-0">
                      <img
                        src={product.Images[0].image_url}
                        alt={product.product_name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  )}
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

        {/* No Results Message for Desktop */}
        {showDropdown && search && products.length === 0 && (
          <div className="absolute top-full left-0 w-full mt-1 bg-white dark:bg-gray-800 border rounded-lg shadow-lg p-4 z-50">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Không tìm thấy sản phẩm
            </p>
          </div>
        )}
      </div>

      {/* Modal for Mobile Search */}
      {isModalOpen && (
        <div className="md:hidden absolute top-10 left-0 w-full z-50 mt-3 ">
          <div className="bg-white dark:bg-gray-800 w-full rounded-lg p-4 relative shadow-lg">
            <button
              className="absolute top-0 right-2 text-red-500  dark:text-gray-300 hover:text-red-700"
              onClick={() => {
                setIsModalOpen(false);
                setShowDropdown(false);
              }}
            >
              ✕
            </button>
            <div className="relative flex items-center border rounded-md p-2 mt-2">
              <input
                type="text"
                placeholder="bạn tìm kiếm gì..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                className="outline-none px-2 text-sm w-full dark:text-white bg-transparent"
              />
              <TfiSearch
                className={`text-xl absolute right-2 top-2.5 cursor-pointer ${
                  search === "" ? "text-gray-300" : "hover:text-gray-400"
                }`}
              />
            </div>

            {/* Dropdown Results in Modal */}
            {showDropdown && search !== "" && products.length > 0 && (
              <div className="mt-2 bg-white dark:bg-gray-800 border rounded-lg max-h-64 overflow-y-auto">
                <div className="p-2">
                  {products.map((product) => (
                    <div
                      key={product.product_id}
                      className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-lg"
                      onClick={() => {
                        handleSearch(product.product_id);
                        setSearch(product.product_name);
                      }}
                    >
                      {product.Images?.[0] && (
                        <div className="w-10 h-10 flex-shrink-0">
                          <img
                            src={product.Images[0].image_url}
                            alt={product.product_name}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                      )}
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

            {/* No Results Message in Modal */}
            {showDropdown && search && products.length === 0 && (
              <div className="mt-2 bg-white dark:bg-gray-800 border rounded-lg p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Không tìm thấy sản phẩm
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchProduct;
