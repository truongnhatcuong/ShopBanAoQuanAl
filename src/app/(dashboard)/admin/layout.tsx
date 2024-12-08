import TopBar from "@/app/components/dashboard/TopBar";
import LeftMenu from "@/app/components/leftMenu/LeftMenu";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} h-screen flex`}>
      {/* Left menu */}
      <div className="w-[16%] bg-gray-900 text-white shadow-lg overflow-y-auto hidden sm:block sm:w-[25%] md:w-[16%] lg:w-[16%]">
        <LeftMenu />
      </div>

      {/* Left border */}
      <div className="bg-slate-200 w-2 fixed h-full left-[16%] sm:left-[25%] md:left-[16%] lg:left-[16%]"></div>

      {/* TopBar and Content */}
      <div className="flex flex-col w-[84%] ml-2">
        <TopBar />
        <div className="bg-slate-200 w-full p-1 mb-3"></div>
        <div className="flex-grow bg-white overflow-y-auto mx-3">
          {children}
        </div>
      </div>

      {/* Right border */}
      <div className="bg-slate-200 w-2 fixed h-full right-0"></div>
    </div>
  );
}
