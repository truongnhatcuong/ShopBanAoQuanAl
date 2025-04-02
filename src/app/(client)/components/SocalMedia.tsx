"use client";
import React, { useState } from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { FaTiktok } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";
import Link from "next/link";

const SocalMedia = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div
          className={`flex flex-col gap-4 text-3xl mr-3.5 fixed bottom-[90px] right-[110px]  z-50
          transition-all duration-700 ease-in-out transform 
          ${isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <Link
            className="bg-gradient-to-r from-red-600 to-pink-600 hover:scale-110 w-fit hover:shadow-md p-3 text-white rounded-full transition-all duration-75"
            href="https://www.instagram.com/tncuong2004/"
            target="_blank"
          >
            <CiInstagram />
          </Link>
          <Link
            className="bg-black dark:border-2 w-fit hover:scale-110 hover:shadow-md p-3 text-white rounded-full transition-all duration-75"
            href="https://www.tiktok.com/@developerwebjs?_t=ZS-8v7W8sc6l7p&_r=1"
            target="_blank"
          >
            <FaTiktok />
          </Link>
          <Link
            className="bg-blue-500 hover:scale-110 hover:shadow-md w-fit p-3 text-white rounded-full transition-all duration-75"
            href="#"
          >
            <SiZalo />
          </Link>
          <Link
            className="bg-blue-700 hover:scale-110 hover:shadow-md w-fit p-3 text-white rounded-full transition-all duration-75"
            href="https://www.facebook.com/tncuong2004/"
            target="_blank"
          >
            <FaFacebookSquare />
          </Link>
        </div>
      )}

      <div
        className="text-2xl mt-5 text-white border-2 bg-blue-300/20 w-fit rounded-full bg-white p-3 cursor-pointer fixed bottom-5 right-[120px] transition-all duration-300 hover:scale-110"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <>✖️</> : <>🔗</>}
      </div>
    </>
  );
};

export default SocalMedia;
