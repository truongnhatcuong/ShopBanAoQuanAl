import React from "react";
import MenuItemPage from "./MenuItemPage";
import { useTranslations } from "next-intl";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import { FaFemale, FaMale } from "react-icons/fa";
import { AiOutlineMan, AiOutlineWoman } from "react-icons/ai";
interface IMenuProps {
  id: number;
  title: string;
  link?: string;
  hasDropdown?: boolean;
  icon?: JSX.Element;
}

interface ICategory {
  category_id: number;
  category_name: string;
}
interface IProps {
  categories: ICategory[];
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
const ListItem = ({ categories }: IProps) => {
  const t = useTranslations();
  const MenuHeader: IMenuProps[] = [
    {
      id: 1,
      title: t("menu.home"),
      link: "/",
    },
    {
      id: 2,
      title: t("menu.collection"),
      link: "/product",
    },
    {
      id: 3,
      title: t("menu.about"),
      link: "/about",
    },
    {
      id: 4,
      title: t("menu.man"),
      link: "/product?category_id=1",
      icon: <AiOutlineMan className="text-blue-500" size={20} />,
    },
    {
      id: 5,
      title: t("menu.woman"),
      link: "/product?category_id=2",
      icon: <AiOutlineWoman className="text-red-500" size={20} />,
    },
    {
      id: 6,
      title: t("menu.categories"),
      hasDropdown: true,
    },
  ];

  return (
    <ul className="flex gap-6">
      {MenuHeader.map((item) =>
        item.hasDropdown ? (
          <li key={item.id}>
            <HoverCard>
              <HoverCardTrigger>
                <div className="ml-2 mt-[1px] hidden sm:flex uppercase cursor-pointer text-[15px]">
                  <p>{t("menu.categories")}</p>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-[400px] mt-[2px]">
                <div className="grid grid-cols-3 gap-4">
                  {categories
                    .filter(
                      (item) => item.category_id !== 2 && item.category_id !== 1
                    )
                    .map((category: any) => (
                      <div
                        key={category.category_id}
                        className="text-left hover:text-red-500"
                      >
                        <Link
                          href={`/product?category_id=${category.category_id}`}
                        >
                          {category.category_name}
                        </Link>
                      </div>
                    ))}
                </div>
              </HoverCardContent>
            </HoverCard>
          </li>
        ) : (
          <li key={item.id}>
            <MenuItemPage {...item} />
          </li>
        )
      )}
    </ul>
  );
};

export default ListItem;
