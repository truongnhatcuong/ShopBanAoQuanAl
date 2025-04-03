"use client";
import React, { useContext } from "react";
import Link from "next/link";
import SubmenuItems from "./SubmenuItems";
import { ShopConText } from "@/app/context/Context";

interface IMenu {
  id: number;
  icon: React.ReactElement;
  title: string;
  link: string;
  submenu?: IMenu[];
}

interface IProps {
  menuItem: IMenu;
}

const MenuItems = ({ menuItem }: IProps) => {
  const { isLeftMenuVisible } = useContext(ShopConText)!;
  const isLogoutItem = menuItem.id === 5; // Đánh dấu item logout

  return (
    <ul className="flex flex-col mt-2">
      <li className="group">
        <Link
          href={menuItem.link}
          className="flex items-center justify-between w-full p-1.5 rounded-lg transition-all duration-300 "
        >
          <div className="flex items-center ">
            {/* Icon */}
            <span
              className={`flex-shrink-0 text-slate-300/90 transition-colors duration-200
                ${isLeftMenuVisible ? "text-xl " : "text-xl md:text-3xl"}
                ${isLogoutItem ? "ml-2 md:ml-4 hover:text-red-500" : ""}
                `}
            >
              {menuItem.icon}
            </span>

            {/* Title - Chỉ hiển thị khi menu mở trên md+ */}
            {isLeftMenuVisible && (
              <span
                className={`ml-1 text-lg font-semibold text-white uppercase truncate
                  hidden md:block transition-opacity duration-200
                  ${isLogoutItem ? "hover:text-red-500 " : ""}`}
              >
                {menuItem.title}
              </span>
            )}
          </div>
        </Link>
      </li>

      {/* Submenu */}
      {menuItem.submenu && (
        <ul
          className={`ml-5  transition-all duration-300
            ${isLeftMenuVisible ? "md:w-48" : "md:w-14"}`}
        >
          {menuItem.submenu.map((item) => (
            <li key={item.id}>
              <SubmenuItems menuItem={item} />
            </li>
          ))}
        </ul>
      )}
    </ul>
  );
};

export default MenuItems;
