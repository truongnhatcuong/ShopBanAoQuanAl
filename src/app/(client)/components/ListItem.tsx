import React from "react";
import MenuItemPage from "./MenuItemPage";

interface IMenuProps {
  id: number;
  title: string;
  link: string;
}

const MenuHeader: IMenuProps[] = [
  {
    id: 1,
    title: "Trang Chủ",
    link: "/",
  },
  {
    id: 2,
    title: "Giới Thiệu",
    link: "/about",
  },
  {
    id: 3,
    title: "Bộ Sưu Tầm",
    link: "/superSet",
  },
];

const ListItem = () => {
  return (
    <>
      <ul className="flex space-x-9">
        {MenuHeader.map((item) => (
          <li key={item.id}>
            <MenuItemPage {...item} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListItem;
