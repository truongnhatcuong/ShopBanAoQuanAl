import Link from "next/link";
import React, { useState } from "react";

interface IProps {
  menuItem: IMenu;
  isSelected: boolean; // Trạng thái để xác định submenu có được chọn không
  onClick: () => void;
}

interface IMenu {
  id: number;
  icon: React.ReactNode;
  title: string;
  link: string;
  submenu?: IMenu[];
}

const SubmenuItems = (props: IProps) => {
  return (
    <div
      onClick={props.onClick}
      className={`ml-3 flex items-center cursor-pointer rounded-lg transition-colors duration-200 w-full   ${
        props.isSelected ? "bg-blue-400 p-1" : "hover:bg-gray-600 p-1 "
      }`}
    >
      <Link
        href={props.menuItem.link}
        className={`flex items-center w-full p-1 transition-colors duration-200 ${
          props.isSelected ? "text-black  font-bold" : "text-white  font-medium"
        }`}
      >
        <span className="mr-1">{props.menuItem.icon}</span>
        <span>{props.menuItem.title}</span>
      </Link>
    </div>
  );
};

export default SubmenuItems;
