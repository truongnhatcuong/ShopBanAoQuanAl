"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface IMenuProps {
  id: number;
  title: string;
  link: string;
}
const MenuItemPage = (props: IMenuProps) => {
  const pathname = usePathname();
  return (
    <div>
      <Link href={props.link}>
        <p
          className={`${
            pathname === props.link ? "border-b-4 border-blue-500 " : ""
          } font-semibold`}
        >
          {props.title}
        </p>
      </Link>
    </div>
  );
};

export default MenuItemPage;
