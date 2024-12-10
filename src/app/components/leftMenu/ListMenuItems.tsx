import React from "react";
import { AiOutlineProduct } from "react-icons/ai";
import MenuItems from "./MenuItem";
import { TbCategory } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";
import {
  FaTruck,
  FaLinkedin,
  FaCloudSun,
  FaStar,
  FaUser,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { BiBell, BiCart } from "react-icons/bi";
import { FiPackage } from "react-icons/fi";
import { MdOutlinePayments, MdOutlineRateReview } from "react-icons/md";
import { RiCoupon3Fill } from "react-icons/ri";

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
        title: "Category",
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
        title: "Customer",
        link: "/admin/danhmuc/customer",
      },
      { id: 2, icon: <BiCart />, title: "Cart", link: "/admin/danhmuc/cart" },
      {
        id: 3,
        icon: <FiPackage />,
        title: "Wishlist",
        link: "/admin/danhmuc/wishlist",
      },
    ],
  },
  {
    id: 3,
    icon: <FaMoneyCheckAlt />,
    title: "Quản Lý Đơn Hàng",
    link: "#",
    submenu: [
      {
        id: 1,
        icon: <FiPackage />,
        title: "Order",
        link: "/admin/danhmuc/order",
      },
      {
        id: 2,
        icon: <MdOutlinePayments />,
        title: "Payment",
        link: "/admin/danhmuc/payment",
      },
      {
        id: 3,
        icon: <FiPackage />,
        title: "Return",
        link: "/admin/danhmuc/return",
      },
    ],
  },
  {
    id: 4,
    icon: <MdOutlineRateReview />,
    title: "Quản Lý Đánh Giá",
    link: "#",
    submenu: [
      {
        id: 1,
        icon: <FaStar />,
        title: "Rating",
        link: "/admin/danhmuc/rating",
      },
      {
        id: 2,
        icon: <MdOutlineRateReview />,
        title: "Review",
        link: "/admin/danhmuc/review",
      },
    ],
  },
  {
    id: 5,
    icon: <RiCoupon3Fill />,
    title: "Quản Lý Khuyến Mãi",
    link: "#",
    submenu: [
      {
        id: 1,
        icon: <RiCoupon3Fill />,
        title: "Promotion",
        link: "/admin/danhmuc/promotion",
      },
      {
        id: 2,
        icon: <RiCoupon3Fill />,
        title: "Coupon",
        link: "/admin/danhmuc/coupon",
      },
    ],
  },
  {
    id: 6,
    icon: <BiBell />,
    title: "Quản Lý Thông Báo",
    link: "#",
    submenu: [
      {
        id: 1,
        icon: <BiBell />,
        title: "Notification",
        link: "/admin/danhmuc/notification",
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
