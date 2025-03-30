"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import SubmenuItems from "./SubmenuItems";
import Image from "next/image";
import { assets } from "@/app/assets/frontend_assets/assets";
import { ShopConText } from "@/app/context/Context";

interface IProps {
  menuItem: IMenu;
}

interface IMenu {
  id: number;
  icon: React.ReactElement;
  title: string;
  link: string;
  submenu?: IMenu[];
}

const MenuItems = (props: IProps) => {
  const { isLeftMenuVisible } = useContext(ShopConText)!;
  return (
    <ul className="flex flex-col  cursor-pointer mt-3 ">
      <li className="flex items-center justify-between rounded-md transition-colors duration-200 mr-4 font-semibold">
        <div className="flex items-center justify-between w-full">
          <Link href={props.menuItem.link} className="flex items-center">
            <span
              className={`mr-3 ml-2 mt-4 ${
                isLeftMenuVisible
                  ? "md:text-3xl text-xl text-slate-300/90 "
                  : "md:text-3xl text-slate-300/90 "
              }`}
            >
              {props.menuItem.icon}
            </span>
            {isLeftMenuVisible && (
              <span
                className={`ml-1 mt-6 pb-1.5 text-xl  font-semibold  hidden md:block text-white  `}
              >
                {props.menuItem.title}
              </span>
            )}
          </Link>
        </div>
      </li>

      {props.menuItem.submenu && (
        <ul
          className={`ml-7 text-gray-950 w-8  rounded-lg mt-1 ${
            isLeftMenuVisible ? " md:w-48 " : "md:w-14  "
          }`}
        >
          {props.menuItem.submenu.map((item, index) => (
            <li key={item.id} className="">
              <div className="text-base ">
                <SubmenuItems menuItem={item} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </ul>
  );
};

export default MenuItems;
