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
import { HiMenu, HiOutlineShoppingBag } from "react-icons/hi";
interface ICategory {
  category_id: number;
  category_name: string;
}

export default function HeadePager() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [countCart, setCountCart] = useState(0);
  const [roleId, setRoleId] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const [visible, setVisible] = useState<boolean>(false);

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

  async function ApiCount() {
    const res = await fetch("/api/cart");
    const data = await res.json();
    const totalQuantity =
      data?.cart?.items.reduce(
        (total: number, item: any) => total + item.quantity,
        0
      ) || 0;
    setCountCart(totalQuantity);
  }

  async function fetchUserInfo() {
    const res = await fetch("/api/auth/getUsername", {
      method: "GET",
    });
    const data = await res.json();
    setUsername(data.accessToken?.name); // Lấy username từ dữ liệu trả về
    setRoleId(data.accessToken?.roleId);
    setIsLoggedIn(true);
  }

  useEffect(() => {
    fetchUserInfo(); // Gọi API lấy thông tin người dùng
    ApiCategories(); // Gọi API lấy danh mục
  }, []);

  useEffect(() => {
    ApiCount();
  }, []);

  return (
    <div className="flex justify-around bg-white items-center font-medium p-3 sm:p-0 ">
      <div className="mt-2">
        <Link href={"/"} className="hiden md:block">
          <Image src={"/Image/logo.png"} alt="Logo" width={200} height={50} />
        </Link>
      </div>
      <div className=" mr-5 hidden  sm:flex gap-5 uppercase">
        <ListItem />
        <div className="group relative z-10">
          <div className="ml-5 hidden sm:flex gap-5 uppercase cursor-pointer ">
            DANH MỤC
          </div>
          <div className="group-hover:block hidden absolute dropdown-menu  pt-4 -right-14">
            <div className="flex flex-col gap-2 w-48  bg-slate-50 text-gray-500 rounded-md">
              {categories.map((item) => (
                <Link
                  href={`/product?category_id=${item.category_id}`}
                  key={item.category_id}
                >
                  <p className="block px-2 py-1 my-1.5 text-gray-700 hover:border-b-2 hover:border-teal-600 transition-all text-center">
                    {item.category_name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
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
            <div className="group relative flex z-10 ">
              <FiUser className="text-gray-600 text-2xl sm:text-xl" />
              <span className="text-gray-800 hidden md:block ">{username}</span>
              {/* Hiển thị khi hover */}

              <div className="group-hover:block hidden absolute dropdown-menu pt-10 -right-14 ">
                <div className="flex flex-col gap-2 w-48 py-3 px-5 bg-slate-50 text-gray-500 rounded-md ">
                  <button
                    className="text-sm text-gray-600 hover:text-red-600 flex items-center justify-center  "
                    onClick={() => router.push("/profile")}
                  >
                    <AiOutlineUser className="mr-1 text-gray-900" />
                    Xem Thông Tin
                  </button>
                  {roleId === 3 && (
                    <button
                      className="text-sm text-gray-600 hover:text-red-600 flex items-center justify-center"
                      onClick={() => router.push("/admin")}
                    >
                      <RiAdminLine className="mr-1 text-gray-900" />
                      Trang Quản Lý
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
            <div className="relative group z-10">
              <FaUser className="text-gray-700 hover:text-blue-500 cursor-pointer text-xl border border-black rounded-full w-6 h-6 p-0.5 " />

              {/* Hiển thị đăng ký/đăng nhập khi hover */}

              <div className="group-hover:block hidden absolute dropdown-menu  pt-4 -right-12">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-50 text-gray-500 rounded-md">
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
            </div>
          )}
        </div>

        <div className="relative">
          {" "}
          <Link href={"/cart"}>
            <HiOutlineShoppingBag className="text-3xl cursor-pointer mr-5 " />
          </Link>
          <p className="absolute right-[-4px] bottom-[-5px] w-[17px] text-center leading-4 bg-black text-white rounded-full aspect-square text-[10px] mr-5 ">
            {countCart}
          </p>
        </div>

        <div>
          <HiMenu
            className="text-2xl cursor-pointer sm:hidden ml-5"
            onClick={() => setVisible(true)}
          />
        </div>
        {/* thanh menu ở giao diện màn hình nhỏ */}
        <div
          className={`absolute top-0 right-0 text-gray-500 gap-4 overflow-hidden bg-white transition-all ${
            visible ? "w-full" : "w-0 "
          }`}
        ></div>
      </div>
    </div>
  );
}
