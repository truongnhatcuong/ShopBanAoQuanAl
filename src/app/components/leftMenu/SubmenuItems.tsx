import Link from "next/link";
import React from "react";

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
  return (
    <div className="flex items-center cursor-pointer hover:bg-gray-700 rounded-md transition-colors duration-200">
      <Link
        href={props.menuItem.link}
        className="flex items-center w-full p-2 text-xl text-gray-300 hover:text-white"
      >
        <span className="mr-2">{props.menuItem.icon}</span>
        <span>{props.menuItem.title}</span>
      </Link>
    </div>
  );
};

export default SubmenuItems;
