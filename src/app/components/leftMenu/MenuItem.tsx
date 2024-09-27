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

  const handlerSelect = (id: number) => setSelectedSubmenu(id);
  return (
    <ul className="flex flex-col cursor-pointer ">
      <Link
        href={props.menuItem.link}
        className="flex items-center  justify-center rounded-md transition-colors duration-200 mr-6 font-bold "
      >
        <span className="mr-2">{props.menuItem.icon}</span>
        <span className="">{props.menuItem.title}</span>
      </Link>
      {props.menuItem.submenu
        ? props.menuItem.submenu.map((item) => (
            <li key={item.id}>
              <div className="p-0.5 text-xs">
                <SubmenuItems
                  menuItem={item}
                  isSelected={selectedSubmenu === item.id}
                  onClick={() => handlerSelect(item.id)}
                />
              </div>
            </li>
          ))
        : null}
    </ul>
  );
};

export default MenuItems;
