"use client";
import React from "react";
import Brand from "./Brand";
import ListMenuItems from "./ListMenuItems";

const LeftMenu = () => {
  return (
    <div className="flex flex-col items-center  ">
      <div className="flex items-center justify-center font-bold bg-gray-900 w-full mt-1">
        <Brand />
      </div>
      <div className="flex-grow w-full ">
        <ListMenuItems />
      </div>
    </div>
  );
};

export default LeftMenu;
