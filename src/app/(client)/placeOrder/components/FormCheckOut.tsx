/* eslint-disable react-hooks/exhaustive-deps */
"use client";
/* eslint-disable @next/next/no-img-element */
import { ShopConText } from "@/app/context/Context";
import { ForMatPrice } from "@/lib/FormPrice";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

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

const FormCheckOut = ({ cart }: CartItemListProps) => {
  const { totalPrice, couponName, setCouponName } = useContext(ShopConText)!;

  const [data, setData] = useState<ICoupon[]>([]);
  const [currentCustomerId, setCurrentCustomerId] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(totalPrice) || totalPrice;

  const FetchApi = async () => {
    const res = await fetch("/api/coupon");
    const data = await res.json();
    setData(data.coupon || []);
  };

  const FetchUser = async () => {
    const resUser = await fetch("/api/auth/getUsername");
    const dataUser = await resUser.json();
    setCurrentCustomerId(dataUser.accessToken.customer_id);
  };

  useEffect(() => {
    FetchApi();
    FetchUser();
  }, []);

  const handleApplyCoupon = () => {
    const coupon = data.find(
      (item) => item.coupon_code === couponName.trim().toUpperCase()
    );

    if (!coupon) {
      alert("Mã giảm giá không hợp lệ.");
      setCouponName("");
      setDiscountAmount(0); // Không có giảm giá
      setFinalTotal(totalPrice); // Trả về tổng tiền ban đầu
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
      setCouponName("");
      setFinalTotal(totalPrice);
      return;
    }

    const currentDate = new Date();
    if (
      currentDate > new Date(coupon.end_date) ||
      currentDate < new Date(coupon.start_date)
    ) {
      alert("Mã giảm giá đã hết hạn.");
      setDiscountAmount(0); // Không có giảm giá
      setFinalTotal(totalPrice); // Trả về tổng tiền ban đầu
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
    setCouponName("");
    setFinalTotal(totalPrice - discount + 25000);
  };

  return (
    <div className=" bg-white shadow-lg w-full ml-2  h-full">
      {cart.map((item) => (
        <div key={item.cartitem_id} className="">
          {/* produt */}
          <div className="flex  flex-col md:flex-row  gap-3  items-center border-b pb-1 ">
            <div className="flex gap-3 items-center md:ml-5 ml-0 my-3 md:my-0 ">
              <div className="relative mr-2">
                <img
                  src={item.product.Images[0].image_url}
                  alt=""
                  className="w-14 h-14 object-cover md:my-5 my-0 ml-3 rounded-md  "
                />
                <p className=" bg-black text-white w-4 h-3.5 px-2 py-0.5 flex items-center justify-center text-sm rounded-sm absolute -top-1 md:top-4 -right-4">
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
        <div className="flex items-center justify-center my-5 ">
          <input
            type="text"
            className="w-2/5 py-[10.4px] px-3  text-sm  border-[2px] border-black  outline-none "
            placeholder="Nhap ma giam gia ....."
            value={couponName}
            onChange={(e) => setCouponName(e.target.value.trim())}
          />
          <button
            className="hover:bg-black bg-gray-800 text-white w-fit  py-2.5 px-1.5  font-semibold  "
            onClick={handleApplyCoupon}
          >
            Xác Nhận
          </button>
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
