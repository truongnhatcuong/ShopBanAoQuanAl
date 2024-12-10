"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";

const Brand = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  // Kiểm tra nếu đường dẫn là "/admin" hoặc các trang con của nó
  const isAdminPage = pathname.startsWith("/admin");
  const isAdminPage1 = pathname.startsWith("/(dashboard)/admin");

  return (
    <div>
      <div className="flex gap-3 mt-3">
        <div>
          <Image
            src={"/Image/admin.jpg"}
            alt="Logo"
            width={100}
            height={50}
            className="rounded-full w-10"
          />
        </div>
        <div>
          <p className="text-sm">Trương Nhật Cường</p>
          <p className="flex items-center gap-1 text-sm">
            <FaCircle className="text-green-700 text-xs" />
            online
          </p>
        </div>
      </div>
      <div className="border-gray-300 border-b-2 mt-2"></div>
    </div>
  );
};

export default Brand;
