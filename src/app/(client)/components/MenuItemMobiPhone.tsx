"use client";

import LanguageSwitcher from "@/app/(dashboard)/admin/components/ChangeLanguage/ChangeLanguage";
import { useTranslations } from "next-intl";
import Link from "next/link";
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
      {/* Menu trigger button */}
      <div
        className="block md:hidden text-3xl absolute right-0 cursor-pointer p-2"
        onClick={() => setVisible(true)}
        aria-label="Open menu"
      >
        <HiMenu className="text-end" />
      </div>

      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setVisible(false)}
      ></div>

      {/* Mobile sidebar panel */}
      <div
        className={`fixed inset-y-0 right-0 w-[85%] max-w-sm bg-white z-50 shadow-xl transition-transform duration-500 ease-in-out ${
          visible ? "translate-x-0" : "translate-x-full"
        } flex flex-col h-full`}
      >
        {/* Header with back button and controls */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <button
            className="flex items-center space-x-1 text-gray-700 hover:text-black transition-colors"
            onClick={() => setVisible(false)}
          >
            <IoChevronBackOutline className="text-2xl" />
            <span className="font-medium">Trở Lại</span>
          </button>

          <div className="flex items-center space-x-3">
            <Notificationcoupon />
            <LanguageSwitcher />
          </div>
        </div>

        {/* Main menu section */}
        <div className="flex flex-col overflow-y-auto flex-1">
          {/* Main navigation links */}
          <nav className="py-2">
            {MenuHeader.map((item, index) => (
              <Link
                key={index}
                href={item.link || ""}
                onClick={() => setVisible(false)}
                className={`flex items-center justify-center gap-3 py-3.5 px-4 border-b border-gray-100 transition-colors ${
                  pathname === item.link
                    ? "bg-black text-white font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item.icon}
                <span className="text-base">{item.title}</span>
              </Link>
            ))}
          </nav>

          {/* Categories section */}
          <div className="mt-2 px-4 py-5 bg-gray-50 flex-1">
            <h2 className="text-center text-lg font-bold text-gray-800 uppercase mb-4 tracking-wide">
              Danh mục sản phẩm
            </h2>

            <div className="rounded-lg bg-white shadow-sm overflow-hidden">
              {categories.map((item, index) => (
                <Link
                  href={`/product?category_id=${item.category_id}`}
                  key={item.category_id}
                  onClick={() => setVisible(false)}
                  className={`block px-4 py-3.5 text-gray-700 hover:bg-gray-50 hover:text-red-500 transition-colors ${
                    index !== categories.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                >
                  <p className="text-center font-medium">
                    {item.category_name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Social media links footer */}
        <div className="mt-auto border-t border-gray-200">
          <div className="p-4">
            <p className="text-sm text-gray-500 mb-3 text-center">
              Kết nối với chúng tôi
            </p>
            <div className="flex justify-center items-center gap-4">
              <Link
                className="bg-black hover:bg-gray-800 p-2.5 text-white rounded-full transition-all duration-200 hover:scale-110 flex items-center justify-center w-10 h-10"
                href="https://www.instagram.com/tncuong2004/"
                target="_blank"
                aria-label="Instagram"
              >
                <CiInstagram className="text-xl" />
              </Link>
              <Link
                className="bg-black hover:bg-gray-800 p-2.5 text-white rounded-full transition-all duration-200 hover:scale-110 flex items-center justify-center w-10 h-10"
                href="https://www.tiktok.com/@developerwebjs?_t=ZS-8v7W8sc6l7p&_r=1"
                target="_blank"
                aria-label="TikTok"
              >
                <FaTiktok className="text-xl" />
              </Link>
              <Link
                className="bg-black hover:bg-gray-800 p-2.5 text-white rounded-full transition-all duration-200 hover:scale-110 flex items-center justify-center w-10 h-10"
                href="#"
                aria-label="Zalo"
              >
                <SiZalo className="text-xl" />
              </Link>
              <Link
                className="bg-black hover:bg-gray-800 p-2.5 text-white rounded-full transition-all duration-200 hover:scale-110 flex items-center justify-center w-10 h-10"
                href="https://www.facebook.com/tncuong2004/"
                target="_blank"
                aria-label="Facebook"
              >
                <FaFacebookSquare className="text-xl" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuItemMobiPhone;
