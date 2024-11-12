"use client";
import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { IoSearchSharp, IoCart } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { LiaPowerOffSolid } from "react-icons/lia";
import { AiOutlineUser } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { RiAdminLine } from "react-icons/ri";
import jwt_decode from "jwt-decode";
export default function HeadePager() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  function RemoveLcstore() {
    router.push("/logout");
    window.localStorage.removeItem("token");
    window.location.href = "/login";
  }
  useEffect(() => {
    // Tìm token trong localStorage
    const token = window.localStorage.getItem("token");

    if (token) {
      // Xử lý token và lấy thông tin người dùng
      const decoded = decodeToken(token); // Giải mã token nếu là JWT
      setUsername(decoded.username); // Giả sử token chứa thông tin username
      setIsLoggedIn(true);
    }
  }, []);
  const decodeToken = (token: string) => {
    // Giải mã token JWT để lấy thông tin người dùng
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  return (
    <div className="flex justify-around bg-white shadow-lg mt-5 ">
      <div>
        <Link href={"/"}>
          <Image src={"/Image/logo.png"} alt="Logo" width={200} height={50} />
        </Link>
      </div>
      <div className="mt-7 hidden md:flex flex-grow justify-center">
        <ListItem />
      </div>
      <div className="flex items-center space-x-6 mr-3">
        {/* Search Input */}
        <div className="relative flex items-center border rounded-md p-2">
          <input
            type="text"
            placeholder="Search..."
            className="outline-none px-2"
          />
          <IoSearchSharp className="text-gray-500 ml-2 text-xl" />
        </div>
        <div>
          {isLoggedIn && username ? (
            <div className="relative flex items-center space-x-1 group  cursor-pointer">
              <FiUser className="text-gray-500 " />
              <span className="text-gray-600 ">{username}</span>
              {/* modal */}
              <div className="absolute top-full mt-3 right-12 w-44 p-2 bg-slate-50 shadow-lg rounded-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 transform translate-x-1/2 ">
                <div className="flex flex-col space-y-3 mt-2">
                  <button
                    className="text-sm text-gray-600 hover:text-gray-900 flex items-center justify-center "
                    onClick={() => router.push("/profile")}
                  >
                    <AiOutlineUser className="mr-1 text-gray-900" />
                    Xem Thông Tin
                  </button>
                  {username === "admin" && (
                    <button
                      className="text-sm text-gray-600 hover:text-gray-900 flex items-center justify-center"
                      onClick={() => router.push("/admin")}
                    >
                      <RiAdminLine className="mr-1 text-gray-900" />
                      Quản Lý Admin
                    </button>
                  )}
                  <button
                    className="text-sm text-gray-600 hover:text-red-600 flex items-center justify-center mr-8"
                    onClick={RemoveLcstore}
                  >
                    <LiaPowerOffSolid className="mr-1 text-gray-900 " />
                    Đăng Xuất
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link href={"/login"}>
              <FaUser className="text-gray-700 hover:text-blue-500 cursor-pointer text-xl border border-black rounded-full w-6 h-6 p-0.5" />
            </Link>
          )}
        </div>
        <div>
          <Link href={"/cart"}>
            <IoCart className="text-gray-700 hover:text-blue-500 cursor-pointer text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
}
