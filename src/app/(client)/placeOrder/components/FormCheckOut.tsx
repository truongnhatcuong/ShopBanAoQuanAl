/* eslint-disable react-hooks/exhaustive-deps */
"use client";
/* eslint-disable @next/next/no-img-element */
import { ShopConText } from "@/app/context/Context";
import { ForMatPrice } from "@/lib/FormPrice";
import Image from "next/image";
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
}

interface CartData {
  cart_id: number;
  items: CartItem[];
  customer: string;
}
interface ICoupon {
  coupon_id: number;
  coupon_code: string;
  coupon_percentage: string;
  coupon_amount: string;
  usage_limit: number;
  start_date: string;
  end_date: string;
  PromotionNotifications: {
    Notifications: { Customer: { customer_id: number; name: string } };
  }[];
}

const FormCheckOut = ({ cart, data }: { cart: CartData; data: ICoupon[] }) => {
  const { totalPrice, finalTotal, setFinalTotal } = useContext(ShopConText)!;

  const [couponCode, setCouponCode] = useState("");
  const [currentCustomerId, setCurrentCustomerId] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    const storedUserId = window.localStorage.getItem("userId");
    if (storedUserId) {
      setCurrentCustomerId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (!couponCode && discountAmount === 0) {
      setFinalTotal(totalPrice + 25000);
    }
  }, [couponCode, totalPrice, discountAmount]);

  const handleApplyCoupon = () => {
    const coupon = data.find((item) => item.coupon_code === couponCode);

    if (!coupon) {
      alert("Mã giảm giá không hợp lệ.");
      setCouponCode("");
      setFinalTotal(totalPrice + 25000);
      setDiscountAmount(0);
      return;
    }

    const isValidForCustomer = coupon.PromotionNotifications.some(
      (notification) =>
        notification.Notifications.Customer.customer_id ===
        Number(currentCustomerId)
    );

    if (!isValidForCustomer) {
      alert("Mã giảm giá không áp dụng cho bạn.");
      setDiscountAmount(0);
      setCouponCode("");
      setFinalTotal(totalPrice + 25000);
      return;
    }

    const currentDate = new Date();
    if (
      currentDate > new Date(coupon.end_date) ||
      currentDate < new Date(coupon.start_date)
    ) {
      alert("Mã giảm giá đã hết hạn.");
      setDiscountAmount(0); // Không có giảm giá
      setFinalTotal(totalPrice + 25000);
      return;
    }

    let discount = 0;

    if (coupon.coupon_percentage && Number(coupon.coupon_percentage) > 0) {
      discount = (totalPrice * Number(coupon.coupon_percentage)) / 100;
    }

    if (discount === 0 && coupon.coupon_amount) {
      discount = Number(coupon.coupon_amount);
    }

    setDiscountAmount(discount);
    setFinalTotal(totalPrice - discount + 25000);
  };
  const handleCannelCoupon = () => {
    setCouponCode("");
    setFinalTotal(totalPrice + 25000);
    setDiscountAmount(0);
  };
  console.log("ma giam gia ", couponCode);

  console.log("gia cuoi :", finalTotal);

  return (
    <div className=" bg-white shadow-lg w-full ml-2  h-full">
      {cart.items.map((item) => (
        <div key={item.cartitem_id} className="">
          {/* produt */}
          <div className="flex  flex-col md:flex-row  gap-3  items-center border-b pb-1 ">
            <div className="flex gap-3 items-center md:ml-5 ml-0 my-3 md:my-0 ">
              <div className="relative mr-2">
                <Image
                  width={200}
                  height={200}
                  src={item.product.Images[0].image_url}
                  alt=""
                  className="w-14 h-14 object-cover md:my-5 my-0 ml-3 rounded-md  "
                />
                <p className=" bg-black text-white w-4 h-3.5 px-2 py-0.5 flex items-center justify-center text-sm rounded-sm absolute -top-0.5 md:top-4  -right-2 md:-right-4 ">
                  {item.quantity}
                </p>
              </div>
            </div>
            <div className="flex jusimg items-center w-full">
              <div>
                {" "}
                <p className="text-gray-800 font-semibold text-sm  ">
                  {item.product.product_name} - <span>{item.selectedSize}</span>
                </p>
              </div>
            </div>
            <div>
              {" "}
              <p className=" text-black font-medium mr-6 ">
                {" "}
                {ForMatPrice(Number(item.product.price))}{" "}
              </p>
            </div>
          </div>
        </div>
      ))}
      {/* ma giam gia */}
      <div className="border-b  pb-1">
        <div className="flex items-center justify-center my-5 relative  ">
          <input
            type="text"
            className="w-2/5 py-[10.4px] px-3  text-sm  border-[2px] border-black  outline-none   "
            placeholder="Nhap ma giam gia ....."
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.trim())}
          />
          <button
            className="hover:bg-black bg-gray-800 text-white w-fit  py-2.5 px-1.5  font-semibold  "
            onClick={handleApplyCoupon}
          >
            Xác Nhận
          </button>
          {discountAmount > 0 && (
            <div
              className="absolute right-[240px] top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700 cursor-pointer font-bold text-lg"
              onClick={handleCannelCoupon}
            >
              X
            </div>
          )}
        </div>
      </div>
      {/* mount price items */}
      <div className="mx-4 flex flex-col gap-y-2 mt-2 ">
        <div className="flex justify-between ">
          <p className="text-black text-sm family">Tổng Tiền Hàng </p>
          <p className="text-sm text-black font-medium">
            {ForMatPrice(totalPrice)}
          </p>
        </div>
        {/*  */}
        <div className="flex justify-between ">
          <p className="text-black text-sm family">Tổng Tiền Phí Vận Chuyển</p>
          <p className="text-sm text-red-500 font-medium">
            {totalPrice > 0 ? ForMatPrice(Number(25000)) : 0}
          </p>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between ">
            <p className="text-gray-700 text-sm family">Voucher Giảm Giá</p>
            <p className="text-sm text-red-500 font-medium">
              {ForMatPrice(discountAmount)}
            </p>
          </div>
        )}
      </div>
      {/* tong mount */}
      <div className=" mx-4 border-t mt-3">
        <div className="flex justify-between mt-2">
          <p className="text-gray-700 text-lg family">Tổng Tiền Thanh Toán</p>
          <p className="text-xl text-green-500 font-semibold mb-2">
            {totalPrice > 0
              ? ForMatPrice(totalPrice + 25000 - discountAmount)
              : ForMatPrice(0)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormCheckOut;
