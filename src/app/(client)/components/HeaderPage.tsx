/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useContext, useEffect, useState } from "react";
import ListItem from "./ListItem";
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
import MenuItemMobiPhone from "./MenuItemMobiPhone";

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
        <ListItem categories={categories} />
      </div>

      {/* phần khác */}
      <div className="flex items-center gap-x-5 md:justify-start justify-end">
        {/* Search Input */}
        <div className="hidden md:block">
          <Notificationcoupon />
        </div>

        <div className="hidden md:block">
          {" "}
          <ChangeLanguage />
        </div>
        <div className="dark:bg-transparent md:hidden  ">
          <Link href={"/"} className="">
            <Image
              src={"/Image/logo.png"}
              alt="Logo"
              width={200}
              height={50}
              className="dark:filter dark:invert w-full h-full object-contain  "
            />
          </Link>
        </div>
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
        <div className="relative md:ml-5 mb-[7px]">
          {" "}
          <Link href={"/cart"}>
            <BsBagCheck className="w-[30px] h-[30px] cursor-pointer mr-8 md:mr-0  " />
          </Link>
          <p className="absolute right-[-3.5px] bottom-[-5px] w-[15px] text-center leading-4 bg-black text-white dark:text-black dark:bg-white rounded-full aspect-square text-[10px] mr-8 md:mr-0 ">
            {countCart}
          </p>
        </div>

        {/* chế độ màn hình điện thoại */}
        <MenuItemMobiPhone
          categories={categories}
          pathname={pathname}
          setVisible={setVisible}
          visible={visible}
        />
      </div>
    </div>
  );
}
