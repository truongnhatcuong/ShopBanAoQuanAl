"use client";
import React, { useState } from "react";
import Brand from "./Brand";
import { RiAdminLine } from "react-icons/ri";
import ListMenuItems from "./ListMenuItems";

const LeftMenu = () => {
  return (
    <div className="flex flex-col items-center mt-6">
      <div className="flex items-center justify-center text-3xl bg-gray-900 w-full p-5 ">
        <RiAdminLine className="mr-2" />
        <Brand />
      </div>
      <div className="flex-grow w-full">
        <ListMenuItems />
      </div>
    </div>
  );
};

export default LeftMenu;
