import type { Metadata } from "next";
import { Inter } from "next/font/google";
import HeadePager from "./components/HeaderPager";
import Footer from "./components/Footer";
import ShopContextProvider from "../context/Context";

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
    <div
      suppressHydrationWarning={true}
      className={`${inter.className} container mx-auto`}
    >
      <ShopContextProvider>
        {/* HeaderPager bọc toàn bộ ứng dụng */}
        <HeadePager />
        <main className="container mx-auto">{children}</main>
        <Footer />
      </ShopContextProvider>
    </div>
  );
}
