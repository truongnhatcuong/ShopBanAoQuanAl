import React from "react";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoGoogle } from "react-icons/io";

const Page = () => {
  return (
    <div className="flex justify-center items-center h-screen mb-16">
      <div className="bg-slate-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-screen-md">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-center">Đăng Nhập</h2>
        </div>
        <form className="space-y-4">
          {" "}
          <div className="">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full border rounded  py-3 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="w-full border rounded py-3 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-gray-950 hover:bg-gray-700 text-white font-bold py-4 px-5 rounded focus:outline-none focus:shadow-inherit"
            >
              Đăng Nhập
            </button>
          </div>
        </form>
        <div className="flex justify-between  mt-4">
          <Link href={"/"} className="text-blue-500 hover:text-blue-700">
            Quên Mật Khẩu?
          </Link>
          <Link href={"/"} className="text-blue-500 hover:text-blue-700">
            Đăng Kí
          </Link>
        </div>
        <div className="relative flex items-center mb-3">
          <div className="border border-gray-400 flex-grow"></div>
          <span className="flex-shrink mx-4 text-gray-700 ">Hoặc</span>
          <div className="border border-gray-400 flex-grow"></div>
        </div>
        <div className="space-y-4">
          <Link
            href={"/"}
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white  py-3 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <span className="mr-2">
              <FaFacebookF />
            </span>
            <span> Đăng nhập bằng tài khoản facebook</span>
          </Link>
          <Link
            href={"/sign-in"}
            className="flex items-center justify-center bg-red-500 hover:bg-red-700 text-white  py-3 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <span className="mr-4">
              <IoLogoGoogle />
            </span>
            <span> Đăng nhập bằng tài khoản google</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
