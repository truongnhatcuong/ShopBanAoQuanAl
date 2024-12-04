import React from "react";
import { RiAdminLine } from "react-icons/ri";

const Brand = () => {
  return (
    <div className="   flex items-center">
      <RiAdminLine className="mr-2 mt-3 text-3xl" />
      <div>
        <p className="text-2xl font-semibold mt-3 prata-regular">Dashboard </p>
        <p className="w-14 sm:w-32 h-[1px] sm:h-[2px] bg-gray-100 "></p>
      </div>
    </div>
  );
};

export default Brand;
