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
    <div className={`${inter.className} h-screen`}>
      <div className="flex w-full h-full">
        {/* Left menu with 3D effect */}
        <div className="w-1/5 bg-gray-900 text-white shadow-lg h-full">
          <LeftMenu />
        </div>
        {/* TopBar and Content */}
        <div className="flex flex-col w-4/5 h-full">
          <TopBar />
          <main className="flex-grow bg-white">{children}</main>
        </div>
      </div>
    </div>
  );
}
