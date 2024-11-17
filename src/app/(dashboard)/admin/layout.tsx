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
      <div className="w-[16%] bg-gray-900 text-white shadow-lg overflow-y-auto sm:w-[25%] md:w-[16%] lg:w-[16%] xl:w-[16%]">
        <LeftMenu />
      </div>
      {/* TopBar and Content */}
      <div className="flex flex-col w-[84%] overflow-hidden">
        <TopBar />
        <div className="flex-grow bg-white overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
