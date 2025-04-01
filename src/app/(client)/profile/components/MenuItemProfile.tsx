"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuItemProfile = ({
  link,
  title,
  icon,
}: {
  link: string;
  title: string;
  icon: JSX.Element;
}) => {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <Link href={link}>
      <div className="flex items-center gap-3 rounded-lg p-2 transition-all duration-200 hover:bg-slate-200 dark:hover:bg-slate-800">
        <div
          className={`flex items-center justify-center text-2xl md:text-xl ${
            isActive ? "text-red-500" : "text-gray-600 dark:text-gray-300"
          }`}
        >
          {icon}
        </div>
        <p
          className={`text-base font-semibold ${
            isActive ? "text-red-500" : "text-gray-800 dark:text-gray-200"
          } hidden md:block`}
        >
          {title}
        </p>
      </div>
    </Link>
  );
};

export default MenuItemProfile;
