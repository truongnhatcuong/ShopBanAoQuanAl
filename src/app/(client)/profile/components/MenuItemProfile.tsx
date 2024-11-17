"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuItemProfile = (props: { link: string; title: string }) => {
  const pathname = usePathname();
  return (
    <div>
      <Link href={props.link}>
        <p
          className={`${
            pathname === props.link ? " text-red-500 " : ""
          } font-semibold text-lg`}
        >
          {props.title}
        </p>
      </Link>
    </div>
  );
};

export default MenuItemProfile;
