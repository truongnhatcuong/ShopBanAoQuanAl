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
        className={` shadow-lg   scrollbar-custom  hidden md:block bg-black/90 md:h-[760px] 2xl:h-[1000px] ${
          isLeftMenuVisible
            ? " w-[10%]  md:w-[18%] transition-all duration-700 ease-in"
            : " w-0 md:w-[5%] transition-all duration-500  ease-out"
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
          className={`flex-grow bg-white  overflow-x-auto  mx-auto container scrollbar-custom  ml-2`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
