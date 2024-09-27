import React from "react";
import { AiOutlineProduct } from "react-icons/ai";
import MenuItems from "./MenuItem";
import { TbCategory } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaCloudSun } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegImages } from "react-icons/fa6";

const MenuItem = [
  // {
  //   id: 1,
  //   icon: <RiHome4Line />,
  //   title: "Home",
  //   link: "/admin",
  // },
  {
    id: 1,
    icon: <TbCategory />,
    title: " management",
    link: "/admin",
    submenu: [
      {
        id: 1,
        icon: <MdOutlineCategory />,
        title: " category",
        link: "/admin/danhmuc/categories",
      },
      {
        id: 2,
        icon: <AiOutlineProduct />,
        title: "Product",
        link: "/admin/danhmuc/product",
      },
      {
        id: 3,
        icon: <FaTruck />,
        title: "Supplier",
        link: "/admin/danhmuc/suppliers",
      },
      {
        id: 4,
        icon: <FaLinkedin />,
        title: "Brand",
        link: "/admin/danhmuc/brand",
      },
      {
        id: 5,
        icon: <FaCloudSun />,
        title: "Season",
        link: "/admin/danhmuc/season",
      },
      {
        id: 6,
        icon: <FaStar />,
        title: "Rate",
        link: "/admin/danhmuc/rate",
      },
      {
        id: 7,
        icon: <FaRegImages />,
        title: "Image",
        link: "/admin/danhmuc/Image",
      },
    ],
  },
];

const ListMenu = () => {
  return (
    <div>
      <ul>
        {MenuItem.map((menu) => (
          <li key={menu.id}>
            <MenuItems menuItem={menu} key={menu.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListMenu;
