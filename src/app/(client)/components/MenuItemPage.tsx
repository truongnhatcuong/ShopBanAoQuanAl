"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface IMenuProps {
  id: number;
  title: string;
  link?: string;
  hasDropdown?: boolean;
  icon?: JSX.Element;
}
const MenuItemPage = (props: IMenuProps) => {
  const pathname = usePathname();
  return (
    <div>
      <Link href={props.link || ""}>
        <p
          className={`${
            pathname === props.link ? " border-b-2 border-blue-500 " : ""
          } font-semibold  hover:border-b-2 hover:border-blue-500 text-sm mt-0.5 flex items-center gap-1 `}
        >
          <span>{props.icon}</span> {props.title}
        </p>
      </Link>
    </div>
  );
};

export default MenuItemPage;
