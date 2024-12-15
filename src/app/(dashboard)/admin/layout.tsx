"use client";
import TopBar from "@/app/components/dashboard/TopBar";
import LeftMenu from "@/app/components/leftMenu/LeftMenu";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLeftMenuVisible, setIsLeftMenuVisible] = useState(true);

  const toggleLeftMenu = () => {
    setIsLeftMenuVisible((prev) => !prev);
  };

  return (
    <div
      className={`${inter.className} h-screen flex`}
      suppressHydrationWarning
    >
      {/* Left menu */}
      {isLeftMenuVisible && (
        <div className="w-[16%] bg-gray-900 text-white shadow-lg overflow-y-auto overflow-x-hidden scrollbar-custom hidden sm:block sm:w-[25%] md:w-[16%] lg:w-[16%]">
          <LeftMenu />
        </div>
      )}

      {/* Left border */}
      {isLeftMenuVisible && (
        <div className="bg-slate-200 w-2 fixed h-full left-[16%] sm:left-[25%] md:left-[16%] lg:left-[16%]"></div>
      )}

      {/* TopBar and Content */}
      <div
        className={`flex flex-col ${
          isLeftMenuVisible ? " w-[84%]" : "w-[100%]"
        } ml-2`}
      >
        <TopBar
          onToggleMenu={toggleLeftMenu}
          isLeftMenuVisible={isLeftMenuVisible}
        />

        <div className="bg-slate-200 w-full p-1 mb-3"></div>

        <div
          className={`flex-grow bg-white overflow-y-auto overflow-x-hidden mx-3 scrollbar-custom ${
            isLeftMenuVisible ? "" : "pt-5"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
