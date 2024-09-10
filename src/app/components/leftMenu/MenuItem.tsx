import React from "react";
import Link from "next/link";
import SubmenuItems from "./SubmenuItems";

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
  return (
    <div>
      <ul className="flex flex-col cursor-pointer p-2 rounded-lg ">
        <Link
          href={props.menuItem.link}
          className="flex items-center mt-2 text-4xl font-bold text-white hover:text-gray-300 transition-colors duration-200 ml-4 "
        >
          <span className="mr-3">{props.menuItem.icon}</span>
          <span>{props.menuItem.title}</span>
        </Link>
        {props.menuItem.submenu
          ? props.menuItem.submenu.map((item) => (
              <li
                key={item.id}
                className="mt-3 hover:bg-gray-700 rounded-md transition-colors duration-200"
              >
                <div className="p-3">
                  <SubmenuItems menuItem={item} />
                </div>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default MenuItems;
