/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { SlClose } from "react-icons/sl";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true); // Mở thông báo khi trang tải
    // dùng esc để thoát thông báo
    const hanlekeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 5000);

    window.addEventListener("keydown", hanlekeydown);
  }, []);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 image">
          <div className="animate-slideDown p-6 rounded-xl  relative">
            <img
              src="https://pos.nvncdn.com/05016d-25618/bn/20240927_ZmTAkUn6.gif"
              alt="Image"
              className="w-[50%]  mx-auto" // Căn giữa hình ảnh
            />
            <button
              className="absolute top-2 right-64 cursor-pointer  text-gray-900 hover:text-red-500 bg-white text-2xl  rounded-full  mt-2 ml-2" // Đặt vị trí nút "X"
              onClick={() => setIsOpen(false)}
            >
              <SlClose />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
