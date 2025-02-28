"use client";
import { ShopConText } from "@/app/context/Context";
import Image from "next/image";

import React, { useContext, useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";

const Brand = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [roleId, setRoleId] = useState<number | null>(null);
  async function fetchUserInfo() {
    const res = await fetch("/api/auth/getUsername", {
      method: "GET",
    });
    const data = await res.json();
    setUsername(data.accessToken?.name); // Lấy username từ dữ liệu trả về
    setRoleId(data.accessToken?.roleId);
  }
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const { isLeftMenuVisible } = useContext(ShopConText)!;

  return (
    <div className="">
      <div
        className={`md:flex gap-2 ${
          isLeftMenuVisible ? "mt-2.5" : "md:0 "
        } justify-center  `}
      >
        <div className={` ${isLeftMenuVisible ? "mt-0  " : "mt-1.5 pb-2.5"}`}>
          <div className="w-10 h-10 bg-slate-200 rounded-full flex justify-center items-center  ">
            <span className="text-black">
              {username?.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
        <div className={`${isLeftMenuVisible ? "block" : "hidden"} `}>
          <p className="text-base  mb-0.5 hidden md:block">{username}</p>
          <p className="flex items-center gap-1 text-sm font-medium">
            <FaCircle className="text-green-700 text-xs" />
            online
          </p>
        </div>
      </div>
    </div>
  );
};

export default Brand;
