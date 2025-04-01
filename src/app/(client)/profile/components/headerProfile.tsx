"use client";
import React from "react";
import MenuItemProfile from "./MenuItemProfile";
import { PiUserCircleGearDuotone } from "react-icons/pi";
import { MdOutlineLockOpen } from "react-icons/md";
import { PiAddressBookDuotone } from "react-icons/pi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { RiCoupon3Line } from "react-icons/ri";

const listProfile = [
  {
    id: 1,
    icon: <PiUserCircleGearDuotone />,
    link: "/profile",
    title: "Thông Tin",
  },
  {
    id: 2,
    icon: <PiAddressBookDuotone />,
    link: "/profile/address",
    title: "Địa Chỉ",
  },
  {
    id: 3,
    icon: <MdOutlineLockOpen />,
    link: "/profile/change",
    title: "Đổi Mật Khẩu",
  },
  {
    id: 4,
    icon: <HiOutlineClipboardList />,
    link: "/profile/listorder",
    title: "Đơn Hàng",
  },
  {
    id: 5,
    icon: <RiCoupon3Line />,
    link: "/profile/voucher",
    title: "Kho voucher",
  },
];

const HeaderProfile = () => {
  return (
    <ul className="flex h-full flex-col gap-y-6 bg-slate-100 px-6 py-12 shadow-lg dark:bg-slate-900 dark:text-white md:px-7">
      {listProfile.map((item) => (
        <li key={item.id}>
          <MenuItemProfile {...item} />
        </li>
      ))}
    </ul>
  );
};

export default HeaderProfile;
