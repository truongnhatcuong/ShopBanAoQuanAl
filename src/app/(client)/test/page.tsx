"use client";
import React, { useState } from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { FaTiktok } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen && (
        <div className="flex flex-col gap-4 text-3xl mr-3.5 fixed bottom-[150px] right-4 transition-all ease-in duration-700 cursor-pointer">
          <div className="bg-pink-600 hover:scale-110 w-fit hover:shadow-md p-3 text-white  rounded-full">
            <CiInstagram />
          </div>
          <div className="bg-black w-fit hover:scale-110 hover:shadow-md p-3 text-white  rounded-full">
            <FaTiktok />
          </div>
          <div className="bg-blue-500 hover:scale-110 hover:shadow-md w-fit p-3 text-white  rounded-full">
            <SiZalo />
          </div>
          <div className="bg-blue-700 hover:scale-110 hover:shadow-md w-fit p-3 text-white  rounded-full">
            <FaFacebookSquare />
          </div>
        </div>
      )}
      <div
        className="text-2xl mt-5  text-white border w-fit rounded-full bg-blue-600  p-3 cursor-pointer fixed bottom-20 right-6 "
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✖️" : "🔗"}
      </div>
    </>
  );
};

export default Page;
