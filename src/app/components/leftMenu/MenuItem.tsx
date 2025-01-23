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
  const [isSubmenuVisible, setIsSubmenuVisible] = useState<boolean>(false);
  const { isLeftMenuVisible } = useContext(ShopConText)!;
  return (
    <ul className="flex flex-col cursor-pointer mt-3">
      <li className="flex items-center justify-between rounded-md transition-colors duration-200 mr-4 font-semibold">
        <div
          className="flex items-center justify-between w-full"
          onClick={() => setIsSubmenuVisible(!isSubmenuVisible)}
        >
          <Link href={props.menuItem.link} className="flex items-center">
            <span
              className={`mr-3 ml-2 mt-4 ${
                isLeftMenuVisible ? "md:text-2xl text-xl" : "md:text-2xl "
              }`}
            >
              {props.menuItem.icon}
            </span>
            {isLeftMenuVisible && (
              <span
                className={`ml-1 mt-4 pb-1.5 text-lg  Outfit hidden md:block `}
              >
                {props.menuItem.title}
              </span>
            )}
          </Link>
          {props.menuItem.submenu && (
            <span
              className={` mt-4 transition-transform duration-200 ${
                isSubmenuVisible ? "rotate-90" : ""
              }`}
            >
              <Image
                src={assets.dropdown_icon.src}
                width={30}
                height={40}
                alt=""
                className="w-2.5 transition-transform duration-200 hover:scale-125 md:mr-0 mr-5 "
              />
            </span>
          )}
        </div>
      </li>

      {isSubmenuVisible && props.menuItem.submenu && (
        <ul
          className={`ml-3 text-white w-8  rounded-lg mt-1 ${
            isLeftMenuVisible ? " md:w-48 " : "md:w-10  "
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
