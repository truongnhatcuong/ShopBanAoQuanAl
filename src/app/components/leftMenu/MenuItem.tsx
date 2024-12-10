import React, { useState } from "react";
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
  const [isSubmenuVisible, setIsSubmenuVisible] = useState<boolean>(false);

  return (
    <ul className="flex flex-col cursor-pointer">
      <li className="flex items-center justify-between rounded-md transition-colors duration-200 mr-4 font-semibold">
        <Link
          href={props.menuItem.link}
          className="flex items-center w-full"
          onClick={() => setIsSubmenuVisible(!isSubmenuVisible)}
        >
          <span className="mr-3 ml-2 mt-4 ">{props.menuItem.icon}</span>
          <span className="ml-1 mt-4 pb-1.5 text-lg family">
            {props.menuItem.title}
          </span>
        </Link>
      </li>

      {isSubmenuVisible && props.menuItem.submenu && (
        <ul className="  ">
          {props.menuItem.submenu.map((item) => (
            <li key={item.id}>
              <div className="p-0.5 text-sm ">
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
