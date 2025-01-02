/* eslint-disable @next/next/no-img-element */
import { assets } from "@/app/assets/frontend_assets/assets";
import { ShopConText } from "@/app/context/Context";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

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

  const updateCartItemQuantity = (cartItemId: number, quantity: number) => {
    handleUpdateCartItem(cartItemId, quantity);
    setCartItems((prevItem) =>
      prevItem.map((item) =>
        item.cartitem_id === cartItemId ? { ...item, quantity } : item
      )
    );
  };
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
    <div className="py-4 ">
      {cartItems.map((item) => {
        const productPrice = Number(item.product.price);
        const productTotal = productPrice * item.quantity;
        return (
          <div
            key={item.cartitem_id}
            className="py-4 border-t border-b  grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.product.Images[0].image_url}
                alt="Product image"
                className="w-16 sm:w-20"
              />
              <Link href={`/product/${item.product_id}`}>
                <div>
                  <p className="text-sm sm:text-lg font-medium">
                    {item.product.product_name}
                    <br />
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p className="text-xs font-bold">
                      {Number(item.product.price)
                        .toLocaleString("vi-VN")
                        .replace(/\./g, ",")}{" "}
                      đ
                    </p>
                    {/* Hiển thị kích thước đã chọn */}
                  </div>
                </div>
              </Link>
            </div>

            {/* Quantity Input */}
            <div className="flex   justify-around items-center ">
              <div>
                <div className="flex justify-center items-center mr-1">
                  <p className="px-3 sm:px-4 sm:py-1 border border-gray-300 bg-slate-100 dark:text-black rounded-md text-center">
                    {item.selectedSize
                      ? item.selectedSize
                      : "Chưa chọn kích thước"}
                  </p>
                </div>
              </div>
              <input
                className="max-w-10 md:w-32 border py-1.5 text-center mx-6 md:mx-0"
                type="number"
                min={1}
                defaultValue={item.quantity}
                onChange={(e) =>
                  updateCartItemQuantity(
                    item.cartitem_id,
                    Number(e.target.value)
                  )
                }
              />
              <p className="text-xs font-semibold hidden md:block ">
                {productTotal.toLocaleString("vi-VN").replace(/\./g, ",")} đ
              </p>
            </div>

            {/* Bin Icon */}
            <div className="flex justify-end mr-3 dark:bg-transparent ">
              <img
                src={assets.bin_icon.src}
                onClick={() => deleteCartItem(item.cartitem_id)}
                className="w-4 sm:w-5 cursor-pointer dark:filter dark:invert"
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
