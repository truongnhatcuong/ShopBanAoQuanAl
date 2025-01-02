/* eslint-disable @next/next/no-img-element */
import { ShopConText } from "@/app/context/Context";
import React, { useContext } from "react";

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
  cart: CartItem[];
}

const FormCheckOut = ({ cart }: CartItemListProps) => {
  const { totalPrice } = useContext(ShopConText)!;
  return (
    <div className=" bg-white shadow-lg w-full ml-2  ">
      {cart.map((item) => (
        <div key={item.cartitem_id} className="">
          {/* produt */}
          <div className="flex  flex-col md:flex-row  gap-3  items-center border-b  ">
            <div className="flex gap-3 items-center md:ml-5 ml-0 my-3 md:my-0 ">
              <div className="relative">
                <img
                  src={item.product.Images[0].image_url}
                  alt=""
                  className="w-14 h-14 object-cover md:my-5 my-0 ml-3 rounded-md  "
                />
                <p className=" bg-black text-white w-3 h-3.5 flex items-center justify-center text-xs rounded-sm absolute -top-1 md:top-4 -right-4">
                  {item.quantity}
                </p>
              </div>
            </div>
            <div className="flex justify-around items-center w-full">
              <div>
                {" "}
                <p className="text-gray-800 font-semibold text-sm  ">
                  {item.product.product_name} - <span>{item.selectedSize}</span>
                </p>
              </div>
              <div>
                {" "}
                <p className=" text-black font-medium  ">
                  {" "}
                  {Number(item.product.price)
                    .toLocaleString("vi-VN")
                    .replace(/\./g, ",")}{" "}
                  đ
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* ma giam gia */}
      <div className="border-b  ">
        <div className="flex items-center justify-center my-5 ">
          <input
            type="text"
            className="w-2/5 py-[13px] px-3  text-xs focus:ring ring-1 ring-black  outline-none "
            placeholder="Nhap ma giam gia ....."
          />
          <button className="hover:bg-black bg-gray-800 text-white md:w-1/5 w-2/5 py-2.5  font-semibold  ">
            Xác Nhận
          </button>
        </div>
      </div>
      {/* mount price items */}
      <div className="mx-4 border-b ">
        <div className="flex justify-between  my-1.5">
          <p className="text-black text-sm family">Tạm Tính </p>
          <p className="text-xs text-black font-medium">
            {totalPrice.toLocaleString("vi-VN").replace(/\./g, ",")}đ
          </p>
        </div>
        <div className="flex justify-between ">
          <p className="text-black text-sm family">Phí Vận Chuyển</p>
          <p className="text-xs text-black font-medium mb-2">
            {totalPrice > 0
              ? Number(25000).toLocaleString("vi-VN").replace(/\./g, ",")
              : 0}
            đ
          </p>
        </div>
      </div>
      {/* tong mount */}
      <div className="mt-3 mx-5">
        <div className="flex justify-between ">
          <p className="text-gray-700 text-sm family">Tổng Tiền </p>
          <p className="text-base text-black font-medium mb-2">
            {totalPrice > 0
              ? Number(25000 + totalPrice)
                  .toLocaleString("vi-VN")
                  .replace(/\./g, ",")
              : 0}
            đ
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormCheckOut;
