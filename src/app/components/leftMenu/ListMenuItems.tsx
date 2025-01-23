import React from "react";
import { AiOutlineProduct } from "react-icons/ai";
import MenuItems from "./MenuItem";
import { TbCategory } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";
import {
  FaTruck,
  FaLinkedin,
  FaCloudSun,
  FaUser,
  FaGift,
} from "react-icons/fa";
import { BiCart } from "react-icons/bi";
import { FiPackage } from "react-icons/fi";
import { MdOutlineRateReview } from "react-icons/md";
import { RiCoupon2Fill, RiCoupon3Fill } from "react-icons/ri";
import { FaHeartCirclePlus } from "react-icons/fa6";

const MenuItem = [
  {
    id: 1,
    icon: <TbCategory />,
    title: "Quản Lý Sản Phẩm",
    link: "#",
    submenu: [
      {
        id: 1,
        icon: <MdOutlineCategory />,
        title: "Danh Mục",
        link: "/admin/danhmuc/categories",
      },
      {
        id: 2,
        icon: <AiOutlineProduct />,
        title: "Sản Phẩm",
        link: "/admin/danhmuc/product",
      },
      {
        id: 3,
        icon: <FaTruck />,
        title: "Nhà Cung Cấp",
        link: "/admin/danhmuc/suppliers",
      },
      {
        id: 4,
        icon: <FaLinkedin />,
        title: "Thương Hiệu",
        link: "/admin/danhmuc/brand",
      },
      {
        id: 5,
        icon: <FaCloudSun />,
        title: "Mùa",
        link: "/admin/danhmuc/season",
      },
    ],
  },
  {
    id: 2,
    icon: <FaUser />,
    title: "Quản Lý Khách Hàng",
    link: "#",
    submenu: [
      {
        id: 1,
        icon: <MdOutlineCategory />,
        title: "Khách Hàng",
        link: "/admin/danhmuc/customer",
      },
      {
        id: 2,
        icon: <BiCart />,
        title: "Giỏ Hàng",
        link: "/admin/danhmuc/cart",
      },
      {
        id: 3,
        icon: <FiPackage />,
        title: "Đơn Hàng",
        link: "/admin/danhmuc/order",
      },
      {
        id: 4,
        icon: <FaHeartCirclePlus />,
        title: "Yêu Thích",
        link: "/admin/danhmuc/wishlist",
      },
    ],
  },
  {
    id: 3,
    icon: <MdOutlineRateReview />,
    title: "Quản Lý Đánh Giá",
    link: "#",
    submenu: [
      {
        id: 1,
        icon: <MdOutlineRateReview />,
        title: "Đánh Giá ",
        link: "/admin/danhmuc/review",
      },
    ],
  },
  {
    id: 4,
    icon: <RiCoupon2Fill />,
    title: "Quản Lý Khuyến Mãi",
    link: "#",
    submenu: [
      {
        id: 1,
        icon: <FaGift />,
        title: " Khuyến Mãi",
        link: "/admin/danhmuc/promotion",
      },
      {
        id: 2,
        icon: <RiCoupon3Fill />,
        title: "Mã Giảm Giá",
        link: "/admin/danhmuc/coupon",
      },
    ],
  },
];

const ListMenu = () => {
  return (
    <div>
      <ul>
        {MenuItem.map((menu) => (
          <li key={menu.id} className="mb-3 ">
            <MenuItems menuItem={menu} key={menu.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListMenu;
