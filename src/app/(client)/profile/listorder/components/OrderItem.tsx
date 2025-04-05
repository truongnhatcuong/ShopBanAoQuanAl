import { ForMatPrice } from "@/lib/FormPrice";
import Image from "next/image";
import React from "react";

interface IOrderItem {
  item: {
    product_id: number;
    quantity: number;
    price: string;
    Product: { product_name: string; Images: { image_url: string }[] };
    Size: { name_size: string };
  };
}
const OrderItem = ({ item }: IOrderItem) => {
  return (
    <div className="flex gap-4 py-2 border-b items-center">
      {" "}
      <Image
        width={200}
        height={200}
        src={item.Product.Images[0]?.image_url}
        alt="Product"
        className="w-20 h-20 object-cover"
      />
      <div className="flex-1">
        <h1 className="font-medium text-sm">{item.Product.product_name}</h1>
        <p className="text-gray-600 dark:text-white">
          Phân loại hàng: {item.Size.name_size}
        </p>
        <p>x{item.quantity}</p>
      </div>
      <div className="flex items-center">
        <span className="text-sm">{ForMatPrice(Number(item.price))}</span>
      </div>
    </div>
  );
};

export default OrderItem;
