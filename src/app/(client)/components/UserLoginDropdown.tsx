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
interface UserLoginDropdownProps {
  username: string;
  roleId: number | null;
  RemoveLcstore: () => void;
}
const UserLoginDropdown = ({
  roleId,
  username,
  RemoveLcstore,
}: UserLoginDropdownProps) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      {/* <FiUser className=" text-2xl md:text-xl " /> */}
      <DropdownMenuTrigger>
        <div className="flex">
          <div className="w-[30px] h-[30px] bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mr-2 cursor-pointer">
            <span>{username.charAt(0).toLocaleUpperCase()}</span>
          </div>
          <span className=" hidden md:block md:text-base cursor-pointer mt-[2px]">
            {username}
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
        {(roleId === 3 || roleId === 2) && (
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
