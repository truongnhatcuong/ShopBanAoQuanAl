"use client";
import TopBar from "@/app/(dashboard)/admin/components/dashboard/TopBar";
import LeftMenu from "@/app/(dashboard)/admin/components/leftMenu/LeftMenu";
import { ShopConText } from "@/app/context/Context";
import { Inter } from "next/font/google";
import { useContext } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLeftMenuVisible } = useContext(ShopConText)!;
  return (
    <div className={`${inter.className} h-screen flex `}>
      {/* Left menu */}

      <div
        className={` shadow-lg overflow-y-auto overflow-x-hidden scrollbar-custom ${
          isLeftMenuVisible
            ? " w-[10%]  md:w-[15%] transition-all duration-700 ease-in"
            : "md:w-[5%] w-0 transition-all duration-500  ease-out"
        }`}
      >
        <LeftMenu />
      </div>

      {/* TopBar and Content */}
      <div
        className={`flex flex-col ${
          isLeftMenuVisible ? " w-[89%]" : "w-[100%]"
        } `}
      >
        <TopBar />
        <div
          className={`flex-grow bg-white overflow-y-auto overflow-x-auto  scrollbar-custom  ml-2`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
