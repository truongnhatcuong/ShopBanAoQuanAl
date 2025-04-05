"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";

const PathName = () => {
  const pathname = usePathname();

  // Nếu là trang chủ thì không hiển thị
  if (pathname === "/") return null;

  // Tách đường dẫn thành các phần tử
  const pathSegments = pathname.slice(1).split("/"); // Loại bỏ dấu "/" đầu tiên và tách
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    ...pathSegments.map((segment, index) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1), // Viết hoa chữ cái đầu
      path: `/${pathSegments.slice(0, index + 1).join("/")}`,
    })),
  ];

  return (
    <div className="bg-gray-50 py-1 px-6 shadow-sm">
      <nav className="flex items-center space-x-2 text-sm">
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={item.path}>
            {/* Link cho từng phần tử */}
            <Link
              href={item.path}
              className={`${
                index === breadcrumbItems.length - 1
                  ? "text-gray-900 font-medium"
                  : "text-blue-600 hover:text-blue-800"
              } transition-colors duration-200`}
            >
              {item.name}
            </Link>
            {/* Dấu phân cách "/" */}
            {index < breadcrumbItems.length - 1 && (
              <span className="text-gray-400">/</span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
};

export default PathName;
