"use client";
import { usePathname } from "next/navigation";
import React from "react";

const PathName = () => {
  const pathname = usePathname();
  return (
    <div className="bg-red-400 z-50">
      <div>{pathname.slice(1)}</div>
    </div>
  );
};

export default PathName;
