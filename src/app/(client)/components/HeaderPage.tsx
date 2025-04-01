/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useContext, useEffect, useState } from "react";
import ListItem, { MenuHeader } from "./ListItem";
import Image from "next/image";
import Link from "next/link";
import { BsBagCheck } from "react-icons/bs";
import { usePathname, useRouter } from "next/navigation";
import { HiMenu } from "react-icons/hi";
import { ShopConText } from "@/app/context/Context";
import { IoChevronBackOutline } from "react-icons/io5";
import DarkModeSwitch from "./DarkModeSwitch";
import Notificationcoupon from "./Notificationcoupon";
import SearchProduct from "./SearchProduct";
import LoginDropDown from "./LoginDropDown";
import UserLoginDropdown from "./UserLoginDropdown";
import ChangeLanguage from "@/app/(dashboard)/admin/components/ChangeLanguage/ChangeLanguage";

interface ICategory {
  category_id: number;
  category_name: string;
}

export default function HeaderPage() {
  const { countCart, user, setUser } = useContext(ShopConText)!;

  const pathname = usePathname();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [search, setSearch] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  //call api categories
  async function ApiCategories() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
      {
        cache: "force-cache",
        next: { revalidate: 300 },
      }
    );
    const data = await res.json();
    setCategories(data.categories);
  }
  useEffect(() => {
    if (pathname === "/login") {
      setUser({
        username: "",
        roleId: 1,
        image: "",
        name: "",
        phone: "",
        email: "",
      });
    } else if (user) {
      setIsLoggedIn(true);
    }
  }, [pathname]);

  useEffect(() => {
    ApiCategories();
  }, []);

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
          <ListItem categories={categories} />
        </div>
        {/* .............. */}

        {/* .............. */}
      </div>

      {/* phần khác */}
      <div className="flex items-center gap-x-5 ">
        {/* Search Input */}
        <Notificationcoupon />
        <ChangeLanguage />

        {/* product */}
        <SearchProduct search={search} setSearch={setSearch} />
        <div className="mt-1">
          {" "}
          <DarkModeSwitch />
        </div>
        <div>
          {isLoggedIn && user.username ? (
            <UserLoginDropdown user={user} />
          ) : (
            <LoginDropDown login="Đăng Nhập" signUp="Đăng Ký" />
          )}
        </div>

        <div className="relative mr-3 mb-[5px]">
          {" "}
          <Link href={"/cart"}>
            <BsBagCheck className="w-7 h-7 cursor-pointer mr-8 md:mr-0  " />
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
                <Link href={item.link || ""} onClick={() => setVisible(false)}>
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
