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
      className={` flex items-center cursor-pointer rounded-lg transition-colors duration-200 w-full  
      }`}
    >
      <Link
        href={props.menuItem.link}
        className={`flex items-center w-full  transition-colors duration-200 space-y-4 ${
          pathname === props.menuItem.link
            ? "bg-blue-600 text-white rounded-md pb-2 pl-1 font-semibold  "
            : "pl-1"
        }`}
      >
        <span className="mr-2 mt-3.5 ml-6">{props.menuItem.icon}</span>
        <span className="uppercase font-semibold text-sm family ">
          {props.menuItem.title}
        </span>
      </Link>
    </div>
  );
};

export default SubmenuItems;
