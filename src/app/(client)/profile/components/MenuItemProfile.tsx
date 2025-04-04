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
    <Link href={link} className="focus:outline-none ">
      <div
        className={`group flex items-center gap-4 rounded-md p-3 transition-all duration-200 hover:bg-slate-200/10  dark:hover:bg-slate-700 hover:scale-105 hover:shadow-sm focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
          isActive
            ? "bg-slate-200/10 dark:bg-red-900/20 border-l-4 border-red-500"
            : ""
        }`}
      >
        <div
          className={`flex items-center justify-center text-2xl md:text-xl ${
            isActive
              ? "text-red-500 dark:text-red-400"
              : "text-gray-600 dark:text-slate-300"
          }`}
        >
          {icon}
        </div>
        <p
          className={`text-lg font-semibold ${
            isActive
              ? "text-red-500 dark:text-red-400"
              : "text-gray-800 dark:text-slate-200"
          } hidden md:block group-hover:md:block absolute md:static left-full ml-2  text-white p-1 rounded  group-hover:block`}
        >
          {title}
        </p>
      </div>
    </Link>
  );
};

export default MenuItemProfile;
