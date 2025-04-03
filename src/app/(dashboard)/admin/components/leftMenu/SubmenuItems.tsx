import React, { useContext } from "react";
import { usePathname } from "next/navigation";
import { ShopConText } from "@/app/context/Context";
import Link from "next/link";

interface IProps {
  menuItem: IMenu;
}

interface IMenu {
  id: number;
  icon: React.ReactNode;
  title: string;
  link: string;
  submenu?: IMenu[];
}

const SubmenuItems = ({ menuItem }: IProps) => {
  const pathname = usePathname();
  const { isLeftMenuVisible } = useContext(ShopConText)!;

  const isActive = pathname === menuItem.link;

  return (
    <div className="w-full  py-[2.5px]">
      <Link
        href={menuItem.link}
        className={`flex items-center w-full p-[5px] rounded-lg transition-all duration-300 group
          ${
            isActive
              ? "bg-white/10 shadow-sm"
              : "hover:bg-[#3d3d3d]/90 hover:shadow-md hover:scale-x-[1.05]"
          }`}
      >
        {/* Icon */}
        <div
          className={`flex-shrink-0 text-2xl text-slate-200/70 transition-colors duration-200
            ${isActive ? "text-white" : "group-hover:text-white"}
            ${isLeftMenuVisible ? "mr-2" : "mr-0"}`}
        >
          {menuItem.icon}
        </div>

        {/* Title - Chỉ hiển thị khi menu mở trên md+ */}
        {isLeftMenuVisible && (
          <span
            className={`text-base font-medium text-slate-50 capitalize truncate
              hidden md:block transition-opacity duration-200
              ${isActive ? "font-bold text-white" : "group-hover:text-white"}`}
          >
            {menuItem.title}
          </span>
        )}
      </Link>
    </div>
  );
};

export default SubmenuItems;
