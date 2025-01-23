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
        <div
          className={`flex items-center justify-center md:text-2xl text-3xl  ${
            pathname === props.link ? " text-red-500 " : ""
          }  `}
        >
          {props.icon}
        </div>
        <p
          className={`${
            pathname === props.link ? " text-red-500 " : ""
          }  text-lg text-end font-semibold Outfit hidden md:block`}
        >
          {props.title}
        </p>
      </div>
    </Link>
  );
};

export default MenuItemProfile;
