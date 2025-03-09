import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaUser } from "react-icons/fa";
import Link from "next/link";

interface LoginProps {
  login: string;
  signUp: string;
}
const LoginDropDown = ({ login, signUp }: LoginProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <FaUser className=" hover:text-blue-500 cursor-pointer text-xl border border-black dark:border-white rounded-full w-7 h-7 p-0.5 mt-1" />
      </DropdownMenuTrigger>
      {/* Hiển thị đăng ký/đăng nhập khi hover */}
      <DropdownMenuContent className="mt-3.5">
        <DropdownMenuItem>
          {" "}
          <Link href="/login">
            <button className="text-sm text-gray-600 hover:border-b-2 hover:border-gray-700 ml-4 ">
              {login}
            </button>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          {" "}
          <Link href="/signUp">
            <button className="text-sm text-gray-600 hover:border-b-2 hover:border-gray-700  ml-4 ">
              {signUp}
            </button>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LoginDropDown;
