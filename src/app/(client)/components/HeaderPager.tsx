"use client";
import React, { useContext, useEffect, useState } from "react";
import ListItem, { MenuHeader } from "./ListItem";
import Image from "next/image";
import Link from "next/link";
import { BsBagCheck } from "react-icons/bs";
import { FaClipboardCheck, FaUser } from "react-icons/fa";
import { LiaPowerOffSolid } from "react-icons/lia";
import { AiOutlineUser } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import { RiAdminLine } from "react-icons/ri";
import { HiMenu } from "react-icons/hi";
import { ShopConText } from "@/app/context/Context";
import { IoChevronBackOutline } from "react-icons/io5";
import DarkModeSwitch from "./DarkModeSwitch";
import Notificationcoupon from "./Notificationcoupon";
import SearchProduct from "./SearchProduct";
interface ICategory {
  category_id: number;
  category_name: string;
}

export default function HeadePager() {
  const { countCart, handleQuantityCart } = useContext(ShopConText)!;
  const router = useRouter();
  const pathname = usePathname();
  const [username, setUsername] = useState<string | null>(null);

  const [roleId, setRoleId] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [search, setSearch] = useState<string>("");
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
    console.log("Username đã thay đổi:", username);
  }, [username]);

  useEffect(() => {
    fetchUserInfo(); // Gọi API lấy thông tin người dùng
    ApiCategories(); // Gọi API lấy danh mục
  }, []);

  useEffect(() => {
    handleQuantityCart();
  }, [handleQuantityCart]);

  return (
    <div className="flex justify-around text-black dark:text-white dark:bg-black items-center font-medium p-2 ">
      <div className="dark:bg-transparent hidden md:block ">
        <Link href={"/"} className="">
          <Image
            src={"/Image/logo.png"}
            alt="Logo"
            width={200}
            height={50}
            className="dark:filter dark:invert w-[80px] h-[40px] object-cover md:w-[170px] md:h-[50px] "
          />
        </Link>
      </div>
      {/* menu */}
      <div className=" mr-5  hidden  md:flex gap-3 uppercase">
        <div>
          <ListItem />
        </div>

        <div className="group relative z-10">
          <div className="ml-2 hidden sm:flex  uppercase cursor-pointer text-[15px]">
            <p className=""> DANH MỤC</p>
          </div>

          <div className="group-hover:block hidden absolute dropdown-menu  pt-4 -right-14">
            <div className="flex flex-col gap-2 w-48  bg-gray-100  rounded-md">
              {categories.map((item) => (
                <Link
                  href={`/product?category_id=${item.category_id}`}
                  key={item.category_id}
                >
                  <p className="block px-2 py-1 my-0.5 text-gray-800 hover:bg-white hover:text-red-600 transition-all text-center text-base">
                    {item.category_name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* phần khác */}
      <div className="flex items-center gap-x-5 ">
        {/* Search Input */}
        <Notificationcoupon />
        {/* product */}
        <SearchProduct search={search} setSearch={setSearch} />
        <div className="mt-1">
          {" "}
          <DarkModeSwitch />
        </div>
        <div>
          {isLoggedIn && username ? (
            <div className="group relative flex z-10  ">
              {/* <FiUser className=" text-2xl md:text-xl " /> */}
              <div className="w-[25px] h-[25px] bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mr-2 cursor-pointer">
                <span>{username.charAt(0).toLocaleUpperCase()}</span>
              </div>
              <span className=" hidden md:block md:text-base cursor-pointer">
                {username}
              </span>
              {/* Hiển thị khi hover */}
              <div className="group-hover:block hidden absolute dropdown-menu pt-10 md:-right-8 -right-20 ">
                <div className="flex flex-col gap-2 w-48 py-3 px-5 bg-slate-50 text-gray-500 rounded-md ">
                  <button
                    className="text-sm text-gray-600 hover:text-red-600 flex items-center justify-center ml-3  "
                    onClick={() => router.push("/profile")}
                  >
                    <AiOutlineUser className="mr-1 text-gray-900" />
                    Tài Khoản Của Tôi
                  </button>
                  <button
                    className="text-sm text-gray-600 hover:text-red-600 flex items-center ml-4  "
                    onClick={() => router.push("/profile/listorder")}
                  >
                    <FaClipboardCheck className="mr-1 text-gray-700" />
                    Đơn Mua
                  </button>
                  {(roleId === 3 || roleId === 2) && (
                    <button
                      className="text-sm text-gray-600 hover:text-red-600 flex items-center justify-center mr-1"
                      onClick={() => router.push("/admin")}
                    >
                      <RiAdminLine className="mr-1 text-gray-900" />
                      Trang Quản Lý
                    </button>
                  )}
                  <button
                    className="text-sm text-gray-600 hover:text-red-600 flex items-center justify-center mr-7"
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
              <FaUser className=" hover:text-blue-500 cursor-pointer text-xl border border-black dark:border-white rounded-full w-6 h-6 p-0.5 " />

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

        <div className="relative mr-3 ">
          {" "}
          <Link href={"/cart"}>
            <BsBagCheck className="text-2xl cursor-pointer mr-8 md:mr-0  " />
          </Link>
          <p className="absolute right-[-3.5px] bottom-[-5px] w-[15px] text-center leading-4 bg-black text-white dark:text-black dark:bg-white rounded-full aspect-square text-[10px] mr-8 md:mr-0 ">
            {countCart}
          </p>
        </div>
        <div
          className="block md:hidden text-3xl absolute right-0  "
          onClick={() => setVisible(true)}
        >
          <HiMenu className="text-end " />
        </div>

        {/* thanh menu ở giao diện màn hình nhỏ */}
        <div
          className={`fixed inset-0   text-gray-500 gap-4 overflow-hidden z-50 bg-white transition-all ${
            visible ? "w-full h-[1299px]" : "w-0 h-0"
          }`}
        >
          <div
            className="mt-5 flex items-center w-1/6 "
            onClick={() => setVisible(false)}
          >
            <IoChevronBackOutline className="text-4xl" />
            <span> Back</span>
          </div>
          <div className="flex flex-col justify-center w-full text-center my-7">
            {MenuHeader.map((item, index) => (
              <div
                key={index}
                className={`border-y-[1px] border-b-gray-400 p-3 ${
                  pathname === item.link ? "bg-black text-white" : ""
                } `}
              >
                <Link href={item.link} onClick={() => setVisible(false)}>
                  {item.title}
                </Link>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 bg-gray-100 rounded-lg shadow-lg p-4">
            <div className=" mt-7 text-center text-2xl font-semibold text-black uppercase">
              danh mục sản phẩm
            </div>
            <div className="flex flex-col divide-y divide-gray-300">
              {categories.map((item) => (
                <Link
                  href={`/product?category_id=${item.category_id}`}
                  key={item.category_id}
                  onClick={() => setVisible(false)}
                  className="block px-4 py-3 text-gray-600 hover:bg-gray-200 hover:text-red-500 rounded-lg transition-all"
                >
                  <p className="text-base font-medium text-center">
                    {item.category_name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
