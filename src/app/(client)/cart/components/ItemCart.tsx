/* eslint-disable @next/next/no-img-element */
import { assets } from "@/app/assets/frontend_assets/assets";
import { ShopConText } from "@/app/context/Context";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useContext, useEffect, useState } from "react";

interface CartItem {
  cartitem_id: number;
  product_id: number;
  quantity: number;
  selectedSize: string;
  product: {
    product_name: string;
    price: string;
    Images: { image_url: string }[];
  };
  image_url: string;
}

interface CartItemListProps {
  items: CartItem[];
}

const ItemCart = ({ items }: CartItemListProps) => {
  const { handleDeleteCartItem, handleUpdateCartItem } =
    useContext(ShopConText)!;
  const [cartItems, setCartItems] = useState<CartItem[]>(items);
  useEffect(() => {
    setCartItems(items);
  }, [items]);

  const deleteCartItem = async (cartItemId: number) => {
    handleDeleteCartItem(cartItemId);
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.cartitem_id !== cartItemId)
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const handleUpdateDecreateCart = useCallback(
    (cartItemId: number, quantity: number) => {
      if (quantity <= 1) return;
      const newQuantity = quantity - 1;
      setCartItems((prev) =>
        prev.map((item) =>
          item.cartitem_id === cartItemId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
      handleUpdateCartItem(cartItemId, newQuantity);
      console.log("After Decrement:", cartItemId, newQuantity);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const handleUpdateIncreateCart = useCallback(
    (cartItemId: number, quantity: number, maxQuantity: number) => {
      if (quantity > maxQuantity) return;
      setCartItems((prev) =>
        prev.map((item) =>
          item.cartitem_id === cartItemId
            ? { ...item, quantity: quantity++ }
            : item
        )
      );
      handleUpdateCartItem(cartItemId, quantity + 1);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (cartItems.length === 0) {
    return (
      <div className="py-4">
        <p className="text-center text-base ">
          chưa có sản phẩm trong giỏ hàng
        </p>
      </div>
    );
  }

  return (
    <div className="py-4">
      {cartItems.map((item) => {
        const productPrice = Number(item.product.price);
        const productTotal = productPrice * item.quantity;
        return (
          <div
            key={item.cartitem_id}
            className="py-4 px-4 sm:px-7 border-t border-b border-gray-200 grid grid-cols-[3fr_1fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-2 sm:gap-4"
          >
            {/* Product Info */}
            <div className="flex items-center gap-3 sm:gap-4">
              <Image
                width={100}
                height={100}
                src={item.product.Images[0].image_url}
                alt="Product image"
                className="w-14 h-14 sm:w-20 sm:h-20 object-contain rounded-md"
              />
              <Link href={`/product/${item.product_id}`} className="flex-1">
                <div>
                  <p className="text-sm sm:text-lg font-medium line-clamp-2 hover:text-blue-600 transition-colors">
                    {item.product.product_name}
                  </p>
                  <div className="flex items-center gap-3 sm:gap-5 mt-1 sm:mt-2">
                    <p className="text-xs sm:text-sm font-bold text-gray-800">
                      {Number(item.product.price)
                        .toLocaleString("vi-VN")
                        .replace(/\./g, ",")}{" "}
                      đ
                    </p>
                  </div>
                </div>
              </Link>
              <div className="ml-2 sm:ml-5">
                <p className="px-2 py-1 sm:px-3 sm:py-1.5 border border-gray-300 bg-gray-100 text-xs sm:text-sm rounded-md text-center dark:bg-gray-700 dark:text-white">
                  {item.selectedSize}
                </p>
              </div>
            </div>

            {/* Quantity Input */}
            <div className="flex items-center justify-between gap-2 sm:gap-4">
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  className="p-1.5 sm:p-2 border border-gray-300 hover:bg-gray-300 bg-gray-200 rounded-md transition-colors dark:bg-gray-600 dark:hover:bg-gray-500 dark:border-gray-500"
                  onClick={() =>
                    handleUpdateDecreateCart(item.cartitem_id, item.quantity)
                  }
                >
                  -
                </button>
                <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-50 text-sm sm:text-base rounded-md dark:bg-gray-700 dark:text-white">
                  {item.quantity}
                </div>
                <button
                  className="p-1.5 sm:p-2 border border-gray-300 hover:bg-gray-300 bg-gray-200 rounded-md transition-colors dark:bg-gray-600 dark:hover:bg-gray-500 dark:border-gray-500"
                  onClick={() =>
                    handleUpdateIncreateCart(
                      item.cartitem_id,
                      item.quantity,
                      item.quantity
                    )
                  }
                >
                  +
                </button>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-800 hidden sm:block">
                {productTotal.toLocaleString("vi-VN").replace(/\./g, ",")} đ
              </p>
            </div>

            {/* Bin Icon */}
            <div className="flex justify-end">
              <img
                src={assets.bin_icon.src}
                onClick={() => deleteCartItem(item.cartitem_id)}
                className="w-4 sm:w-5 h-4 sm:h-5 cursor-pointer hover:opacity-70 transition-opacity dark:filter dark:invert"
                alt="Delete Icon"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemCart;
