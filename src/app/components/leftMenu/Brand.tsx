"use client";
import Image from "next/image";

import React, { useEffect, useState } from "react";
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

  return (
    <div>
      <div className="flex gap-2 mt-3 justify-center">
        <div>
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
        <div>
          <p className="text-base  mb-0.5">{username}</p>
          <p className="flex items-center gap-1 text-sm font-medium">
            <FaCircle className="text-green-700 text-xs" />
            online
          </p>
        </div>
      </div>
      <div className="border-gray-300 border-b-2 mt-2 w-[235px]"></div>
    </div>
  );
};

export default Brand;
