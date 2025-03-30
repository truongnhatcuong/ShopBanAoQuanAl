/* eslint-disable @next/next/no-img-element */
"use client";
import { ShopConText } from "@/app/context/Context";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";

const Brand = () => {
  const [user, setUser] = useState({
    username: "",
    roleId: 1,
    image: "",
  });
  async function fetchUserInfo() {
    const res = await fetch("/api/auth/getUsername");
    const data = await res.json();
    setUser({
      username: data.accessToken?.name,
      roleId: data.accessToken?.roleId,
      image: data.accessToken?.image,
    });
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
        <div className={` ${isLeftMenuVisible ? "mt-0 pb-2 " : "mt-1.5 pb-4"}`}>
          {user.image?.length > 0 ? (
            <>
              <Image
                src={user.image}
                width={300}
                height={300}
                alt=""
                className="w-12 h-12  rounded-full"
              />
            </>
          ) : (
            <>
              <div className="w-10 h-10 bg-slate-200 rounded-full flex justify-center items-center  ">
                <span className="text-black">
                  {user.username?.charAt(0).toUpperCase()}
                </span>
              </div>
            </>
          )}
        </div>
        <div className={`${isLeftMenuVisible ? "block" : "hidden"} `}>
          <p className="text-base  mb-0.5 hidden md:block">{user.username}</p>
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
