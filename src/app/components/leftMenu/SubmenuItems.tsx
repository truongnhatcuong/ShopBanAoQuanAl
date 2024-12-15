import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
interface IProps {
  menuItem: IMenu;
}

interface IMenu {
  id: number;
  icon: React.ReactNode;
  title: string;
  link: string;
  submenu?: IMenu[];
}

const SubmenuItems = (props: IProps) => {
  const pathname = usePathname();
  return (
    <div
      className={` flex items-center cursor-pointer rounded-lg transition-colors duration-200 w-full p-0.5
     
      }`}
    >
      <Link
        href={props.menuItem.link}
        className={`flex items-center w-full  transition-colors duration-200 space-y-3 pl-2 pb-0.5  ${
          pathname === props.menuItem.link
            ? "text-red-600  rounded-md  font-semibold  "
            : ""
        }`}
      >
        <span className="mr-2 mt-3.5 ml-6">{props.menuItem.icon}</span>
        <span className="uppercase  text-sm font-bold  ">
          {props.menuItem.title}
        </span>
      </Link>
    </div>
  );
};

export default SubmenuItems;
