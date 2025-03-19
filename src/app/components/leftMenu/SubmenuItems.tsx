import Link from "next/link";
import React, { useContext } from "react";
import { usePathname } from "next/navigation";
import { ShopConText } from "@/app/context/Context";

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

const SubmenuItems = (props: IProps) => {
  const pathname = usePathname();
  const { isLeftMenuVisible } = useContext(ShopConText)!;

  return (
    <div className="flex items-center cursor-pointer rounded-lg transition-colors duration-200 justify-center w-full p-0.5">
      <Link
        href={props.menuItem.link}
        className={`flex items-center w-full transition-colors duration-200 space-y-3 pl-2 pb-0.5 ${
          pathname === props.menuItem.link
            ? "bg-white/10 rounded-lg pb-2.5"
            : ""
        } hover:scale-110 hover:text-4xl transition-all duration-300 ease-out`}
      >
        <div
          className={`mr-2 mt-1.5 md:mt-3 text-slate-200/70  ${
            isLeftMenuVisible
              ? "md:ml-3 ml-0 text-xl hover:scale-110 hover:text-4xl transition-all duration-300 ease-out "
              : "md:ml-0 text-2xl hover:scale-110 hover:text-4xl transition-all duration-300 ease-out"
          }`}
        >
          {props.menuItem.icon}
        </div>
        {isLeftMenuVisible && (
          <div className="uppercase text-base text-slate-50 font-bold hidden md:block">
            {props.menuItem.title}
          </div>
        )}
      </Link>
    </div>
  );
};

export default SubmenuItems;
