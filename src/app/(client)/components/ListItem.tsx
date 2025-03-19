import React from "react";
import MenuItemPage from "./MenuItemPage";

interface IMenuProps {
  id: number;
  title: string;
  link: string;
}

export const MenuHeader: IMenuProps[] = [
  {
    id: 1,
    title: "Trang Chủ",
    link: "/",
  },
  {
    id: 2,
    title: "Bộ Sưu tập",
    link: "/product",
  },
  {
    id: 3,
    title: "Giới Thiệu",
    link: "/about",
  },
  {
    id: 4,
    title: "Trò Chuyện",
    link: "/chatAI",
  },
];

const ListItem = () => {
  return (
    <>
      <ul className="flex gap-6  ">
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
