import LanguageSwitcher from "@/app/(dashboard)/admin/components/ChangeLanguage/ChangeLanguage";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { CiInstagram } from "react-icons/ci";
import { FaFacebookSquare, FaStoreAlt, FaTiktok } from "react-icons/fa";
import { HiHome, HiMenu } from "react-icons/hi";
import {
  IoChevronBackOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import { SiZalo } from "react-icons/si";
import Notificationcoupon from "./Notificationcoupon";

interface IMenuMobiPhone {
  visible: boolean;
  setVisible: (value: boolean) => void;
  categories: any[];
  pathname: any;
}
interface IMenuProps {
  id: number;
  title: string;
  link?: string;
  hasDropdown?: boolean;
  icon?: JSX.Element;
}

const MenuItemMobiPhone = ({
  categories,
  setVisible,
  visible,
  pathname,
}: IMenuMobiPhone) => {
  const t = useTranslations();
  const MenuHeader: IMenuProps[] = [
    {
      id: 1,
      title: t("menu.home"),
      link: "/",
      icon: <HiHome className="text-xl" />,
    },
    {
      id: 2,
      title: t("menu.collection"),
      link: "/product",
      icon: <FaStoreAlt className="text-xl" />,
    },
    {
      id: 3,
      title: t("menu.about"),
      link: "/about",
      icon: <IoInformationCircleOutline className="text-2xl" />,
    },
  ];
  return (
    <>
      <div
        className="block md:hidden text-3xl absolute right-0 cursor-pointer ml-7 "
        onClick={() => setVisible(true)}
      >
        <HiMenu className="text-end " />
      </div>

      {/* thanh menu ở giao diện màn hình nhỏ */}
      <div
        className={`fixed inset-0 bg-white z-50 transition-all duration-700 transform ${
          visible
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
        }`}
        style={{ transitionTimingFunction: "ease-in-out" }}
      >
        {/* back */}

        <div className="flex items-center  justify-between mt-5  cursor-pointer">
          <div className="flex items-center " onClick={() => setVisible(false)}>
            <IoChevronBackOutline className="text-4xl" />
            <span className=""> Trở Lại</span>
          </div>
          <Notificationcoupon />
          <LanguageSwitcher />
        </div>

        <div className="flex flex-col justify-center w-full text-center my-7">
          {MenuHeader.map((item, index) => (
            <div
              key={index}
              className={`border-y-[1px] border-b-gray-400 p-1.5 ${
                pathname === item.link ? "bg-black text-white" : ""
              } `}
            >
              <Link href={item.link || ""} onClick={() => setVisible(false)}>
                <div className="flex items-center justify-center gap-2">
                  {item.icon}
                  {item.title}
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 bg-gray-100 rounded-lg shadow-lg p-4 cursor-pointer">
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
        <div
          className={`flex  gap-7 mt-6 ml-2 justify-end`} // Thêm các lớp cho responsive
        >
          <Link
            className="bg-gradient-to-r from-red-600 to-pink-600 hover:scale-110 w-fit hover:shadow-md p-1.5 text-white rounded-full transition-all duration-75 sm:p-2"
            href="https://www.instagram.com/tncuong2004/"
            target="_blank"
          >
            <CiInstagram />
          </Link>
          <Link
            className="bg-black dark:border-2 w-fit hover:scale-110 hover:shadow-md p-1.5 text-white rounded-full transition-all duration-75 sm:p-2"
            href="https://www.tiktok.com/@developerwebjs?_t=ZS-8v7W8sc6l7p&_r=1"
            target="_blank"
          >
            <FaTiktok />
          </Link>
          <Link
            className="bg-blue-500 hover:scale-110 hover:shadow-md w-fit p-1.5 text-white rounded-full transition-all duration-75 sm:p-2"
            href="#"
          >
            <SiZalo />
          </Link>
          <Link
            className="bg-blue-700 hover:scale-110 hover:shadow-md w-fit p-1.5 text-white rounded-full transition-all duration-75 sm:p-2"
            href="https://www.facebook.com/tncuong2004/"
            target="_blank"
          >
            <FaFacebookSquare />
          </Link>
        </div>
      </div>
    </>
  );
};

export default MenuItemMobiPhone;
