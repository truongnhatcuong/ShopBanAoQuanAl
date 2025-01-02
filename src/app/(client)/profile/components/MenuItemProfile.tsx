"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuItemProfile = (props: {
  link: string;
  title: string;
  icon: JSX.Element;
}) => {
  const pathname = usePathname();
  return (
    <Link href={props.link}>
      <div className="flex items-center gap-3  ">
        <div className="flex items-center justify-center text-2xl">
          {props.icon}
        </div>
        <p
          className={`${
            pathname === props.link ? " text-red-500 " : ""
          }  text-lg text-end prata-regular font-semibold`}
        >
          {props.title}
        </p>
      </div>
    </Link>
  );
};

export default MenuItemProfile;
