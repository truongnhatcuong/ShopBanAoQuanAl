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
interface ICategory {
  category_id: number;
  category_name: string;
}

export default function HeadePager() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isHover2, setIsHover2] = useState<boolean>(false);
  let hoverTimeout: NodeJS.Timeout | null = null;
  function RemoveLcstore() {
    router.push("/logout");
    window.localStorage.removeItem("token");
    window.location.href = "/login";
  }
  //call api categories
  async function ApiCategories() {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data.categories);
  }
  //
  useEffect(() => {
    // Tìm token trong localStorage
    const token = window.localStorage.getItem("token");

    if (token) {
      // Xử lý token và lấy thông tin người dùng
      const decoded = decodeToken(token); // Giải mã token nếu là JWT
      setUsername(decoded.username); // Giả sử token chứa thông tin username
      setIsLoggedIn(true);
    }
    ApiCategories();
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

  const handleMouseEnter2 = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setIsHover2(true);
  };

  const handleMouseLeave2 = () => {
    hoverTimeout = setTimeout(() => {
      setIsHover2(false);
    }, 200); // Delay thời gian 200ms
  };
  return (
    <div className="flex justify-around bg-white shadow-lg mt-5 p-1.5">
      <div className="mt-2">
        <Link href={"/"}>
          <Image
            src={"/Image/logo.png"}
            alt="Logo"
            width={200}
            height={50}
            className=""
          />
        </Link>
      </div>
      <div className="mt-7 hidden md:flex flex-grow justify-center  space-x-6 md:text-xs lg:text-xl md:space-x-1 lg:space-x-10">
        <ListItem />
        <div
          className="relative inline-block"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div className="text-black font-semibold cursor-pointer md:text-xs lg:text-xl md:ml-3 lg:ml-0 ">
            Bộ Sưu Tập
          </div>
          {isHover && (
            <div className="absolute mt-3 right-10 w-48 p-2 bg-slate-50 shadow-lg rounded-md  z-10 transition-opacity duration-200 transform translate-x-1/2 ">
              {categories.map((item) => (
                <Link
                  href={`/product?category_id=${item.category_id}`}
                  key={item.category_id}
                >
                  <p className="block px-4 py-2 text-gray-700 hover:border-b-2 hover:border-teal-600 transition-all max-w-full">
                    {item.category_name}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* phần khác */}
      <div className="flex items-center space-x-5 mr-1">
        {/* Search Input */}
        <div className="relative flex items-center border rounded-md p-2 md:px-1 md:py-2 lg:p-2 ml-3 ">
          <input
            type="text"
            placeholder="Search..."
            className="outline-none px-2"
          />
          <IoSearchSharp className="text-gray-500 ml-2 lg:text-xl md:text-base " />
        </div>
        <div>
          {isLoggedIn && username ? (
            <div
              className="relative flex items-center space-x-1  cursor-pointer"
              onMouseEnter={handleMouseEnter2}
              onMouseLeave={handleMouseLeave2}
            >
              <FiUser className="text-gray-500 " />
              <span className="text-gray-600 ">{username}</span>
              {/* Hiển thị khi hover */}
              {isHover2 && (
                <div className="absolute top-full mt-2.5 right-12 w-44 p-2 bg-slate-50 shadow-lg rounded-lg z-10 opacity-100 transition-opacity duration-200 transform translate-x-1/2  ">
                  <div className="flex flex-col space-y-3 mt-2 ">
                    <button
                      className="text-sm text-gray-600 hover:text-red-600 flex items-center justify-center  "
                      onClick={() => router.push("/profile")}
                    >
                      <AiOutlineUser className="mr-1 text-gray-900" />
                      Xem Thông Tin
                    </button>
                    {username === "Admin" && (
                      <button
                        className="text-sm text-gray-600 hover:text-red-600 flex items-center justify-center"
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
              )}
            </div>
          ) : (
            <div
              className="relative"
              onMouseEnter={handleMouseEnter2}
              onMouseLeave={handleMouseLeave2}
            >
              <FaUser className="text-gray-700 hover:text-blue-500 cursor-pointer text-xl border border-black rounded-full w-6 h-6 p-0.5 " />

              {/* Hiển thị đăng ký/đăng nhập khi hover */}
              {isHover2 && (
                <div className="absolute top-full mt-4 -right-12 w-36  p-2 bg-slate-50 shadow-lg rounded-lg z-10 transition-opacity duration-200  ">
                  <div className="flex flex-col space-y-2 ">
                    <Link href="/login">
                      <button className="text-sm text-gray-600 hover:border-b-2 hover:border-gray-700 ml-4 ">
                        Đăng Nhập
                      </button>
                    </Link>
                    <Link href="/signUp">
                      <button className="text-sm text-gray-600 hover:border-b-2 hover:border-gray-700  ml-4 ">
                        Đăng Ký
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
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
