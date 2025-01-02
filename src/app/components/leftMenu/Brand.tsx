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
          isLeftMenuVisible ? "mt-2.5" : "md:mt-[54px]  `"
        } justify-center `}
      >
        <div className={` ${isLeftMenuVisible ? "mt-2  " : "mt-0 hidden"}`}>
          <Image
            src={`${
              roleId === 3 ? "/Image/admin.jpg" : "/Image/anhdaidien.jpg"
            }`}
            alt="Logo"
            width={100}
            height={40}
            className="rounded-full w-8  "
          />
        </div>
        <div className={`${isLeftMenuVisible ? "block" : "hidden"} `}>
          <p className="text-base  mb-0.5 hidden md:block">{username}</p>
          <p className="flex items-center gap-1 text-sm font-medium">
            <FaCircle className="text-green-700 text-xs" />
            online
          </p>
        </div>
      </div>
      <hr className="border-white border-b-2 md:mt-1.5  w-[235px]" />
    </div>
  );
};

export default Brand;
