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
    <ul className="flex flex-col cursor-pointer">
      <li className="flex items-center justify-between rounded-md transition-colors duration-200 mr-6 font-bold">
        <Link href={props.menuItem.link} className="flex items-center w-full">
          <span className="mr-2 ml-3">{props.menuItem.icon}</span>
          <span className="">{props.menuItem.title}</span>
        </Link>
      </li>

      {/* Hiển thị submenu nếu tồn tại */}
      {props.menuItem.submenu && (
        <ul className="pl-6">
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
