"use client";
import TopBar from "@/app/components/dashboard/TopBar";
import LeftMenu from "@/app/components/leftMenu/LeftMenu";
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
        className={`bg-gray-900 text-white shadow-lg overflow-y-auto overflow-x-hidden scrollbar-custom ${
          isLeftMenuVisible
            ? " w-[16%]  md:w-[20%] transition-all duration-700 ease-in"
            : "md:w-[5%] w-0 transition-all duration-500  ease-out"
        }`}
      >
        <LeftMenu />
      </div>

      {/* TopBar and Content */}
      <div
        className={`flex flex-col ${
          isLeftMenuVisible ? " w-[84%]" : "w-[100%]"
        } `}
      >
        <TopBar />

        <hr className="border-gray-300 border-b-4 w-full  mb-[8px]" />

        <div
          className={`flex-grow bg-white overflow-y-auto overflow-x-auto  scrollbar-custom  ${
            isLeftMenuVisible ? "" : "pt-5"
          } ml-2`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
