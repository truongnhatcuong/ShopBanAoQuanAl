"use client";

import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const [locale, setLocale] = useState("vi");

  // Lấy ngôn ngữ từ cookie khi component được mount
  useEffect(() => {
    const savedLocale = getCookie("NEXT_LOCALE");
    if (savedLocale) {
      setLocale(savedLocale as string);
    }
  }, []);

  // Hàm thay đổi ngôn ngữ
  const changeLanguage = (newLocale: string) => {
    setLocale(newLocale);
    setCookie("NEXT_LOCALE", newLocale, { path: "/" });
    router.refresh(); // Làm mới trang để áp dụng ngôn ngữ mới
  };

  return (
    <select
      value={locale}
      onChange={(e) => changeLanguage(e.target.value)}
      className="w-[59px] text-center "
    >
      <option value="vi">VI</option>
      <option value="en">EN</option>
    </select>
  );
}
