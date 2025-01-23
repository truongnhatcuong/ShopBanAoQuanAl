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
    title: "Thông Tin ",
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
    <>
      <ul className="  flex flex-col pl-7 gap-y-6 text-black dark:text-white dark:bg-black bg-slate-100 shadow-lg h-full pt-12">
        {listProfile.map((item) => (
          <li key={item.id} className="">
            <MenuItemProfile {...item} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default HeaderProfile;
