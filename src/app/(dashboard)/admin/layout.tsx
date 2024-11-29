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
    <div className={`${inter.className} h-screen flex overflow-hidden `}>
      {/* Left menu with 3D effect */}
      <div className="w-[16%] bg-gray-900 text-white shadow-lg overflow-y-auto hidden sm:block sm:w-[25%] md:w-[16%] lg:w-[16%] ">
        <LeftMenu />
      </div>
      <div className="w-2 bg-slate-200"></div>
      {/* TopBar and Content */}
      <div className="flex flex-col w-[84%] overflow-hidden">
        <TopBar />
        <div className="flex-grow bg-white overflow-y-auto mx-3">
          {children}
        </div>
      </div>
    </div>
  );
}
