/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AiOutlineUser } from "react-icons/ai";
import { FaClipboardCheck } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { RiAdminLine } from "react-icons/ri";
import { LiaPowerOffSolid } from "react-icons/lia";
import Image from "next/image";
interface UserLoginDropdownProps {
  user: { roleId: number; username: string; image: string };
  RemoveLcstore: () => void;
}
const UserLoginDropdown = ({ user, RemoveLcstore }: UserLoginDropdownProps) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      {/* <FiUser className=" text-2xl md:text-xl " /> */}
      <DropdownMenuTrigger>
        <div className="flex ">
          {user && user.image?.length > 0 ? (
            <>
              <Image
                src={user.image}
                width={100}
                height={100}
                alt=""
                className="w-7 h-7 border rounded-full "
              />
            </>
          ) : (
            <>
              <div className="w-[30px] h-[30px] bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center  cursor-pointer">
                <span>{user.username.charAt(0).toLocaleUpperCase()}</span>
              </div>
            </>
          )}
          <span className=" hidden md:block md:text-base cursor-pointer mt-[2px] ml-2">
            {user.username}
          </span>
        </div>
      </DropdownMenuTrigger>
      {/* Hiển thị khi hover */}

      <DropdownMenuContent className="mt-2">
        <DropdownMenuItem>
          <button
            className="text-sm text-gray-600 hover:text-red-600 flex items-center justify-center   "
            onClick={() => router.push("/profile")}
          >
            <AiOutlineUser className="mr-1 text-gray-900" />
            Tài Khoản Của Tôi
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button
            className="text-sm text-gray-600 hover:text-red-600 flex items-center   "
            onClick={() => router.push("/profile/listorder")}
          >
            <FaClipboardCheck className="mr-1 text-gray-700" />
            Đơn Mua
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {(user.roleId === 3 || user.roleId === 2) && (
          <>
            <DropdownMenuItem>
              {" "}
              <button
                className="text-sm text-gray-600 hover:text-red-600 flex items-center justify-center mr-1"
                onClick={() => router.push("/admin")}
              >
                <RiAdminLine className="mr-1 text-gray-900" />
                Trang Quản Lý
              </button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem>
          {" "}
          <button
            className="text-sm text-gray-600 hover:text-red-600 flex items-center justify-center mr-7"
            onClick={RemoveLcstore}
          >
            <LiaPowerOffSolid className="mr-1 text-gray-900 " />
            Đăng Xuất
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserLoginDropdown;
