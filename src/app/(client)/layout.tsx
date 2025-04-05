import type { Metadata } from "next";
import { Inter } from "next/font/google";
import HeadePager from "./components/HeaderPage";
import Footer from "./components/Footer";
import ShopContextProvider from "../context/Context";
import PathName from "./components/PathName";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shop Bán Áo Quần ",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${inter.className}  flex flex-col h-screen gap-3  `}>
      <ShopContextProvider>
        <HeadePager />
        <PathName />
        <div className=" mx-auto container  flex-1 flex-wrap ">{children}</div>
        <Footer />
      </ShopContextProvider>
    </div>
  );
}
