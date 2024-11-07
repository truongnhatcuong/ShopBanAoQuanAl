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
  const [selectedSubmenu, setSelectedSubmenu] = useState<number | null>(null);
  const [isSubmenuVisible, setIsSubmenuVisible] = useState<boolean>(false);
  const handlerSelect = (id: number) => {
    setSelectedSubmenu(id);
  };

  return (
    <ul className="flex flex-col cursor-pointer">
      <li className="flex items-center justify-between rounded-md transition-colors duration-200 mr-6 font-bold">
        <Link
          href={props.menuItem.link}
          className="flex items-center w-full"
          onClick={() => setIsSubmenuVisible(!isSubmenuVisible)}
        >
          <span className="mr-3 ml-2 mt-7">{props.menuItem.icon}</span>
          <span className="ml-1 mt-7">{props.menuItem.title}</span>
        </Link>
      </li>

      {isSubmenuVisible && props.menuItem.submenu && (
        <ul className="pl-6 ">
          {props.menuItem.submenu.map((item) => (
            <li key={item.id}>
              <div className="p-0.5 text-sm">
                <SubmenuItems
                  menuItem={item}
                  isSelected={selectedSubmenu === item.id}
                  onClick={() => handlerSelect(item.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </ul>
  );
};

export default MenuItems;
