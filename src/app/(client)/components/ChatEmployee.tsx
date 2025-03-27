"use client"; // Bắt buộc để dùng usePathname trong Next.js App Router

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ChatEmployee = () => {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại

  useEffect(() => {
    if (pathname === "/") {
      const chatContainer = document.getElementById("chat-container");
      if (!chatContainer) return; // Đảm bảo div tồn tại trước khi thêm script

      const script = document.createElement("script");
      script.async = true;
      script.src = "https://embed.tawk.to/67e3bba4591d01190a171ab1/1in8p9uud";
      script.charset = "UTF-8";
      script.setAttribute("crossorigin", "*");
      chatContainer.appendChild(script); // Thêm script vào div thay vì body

      return () => {
        chatContainer.removeChild(script); // Xóa script khi rời khỏi trang
      };
    }
  }, [pathname]);
  return <div id="chat-container"></div>;
};

export default ChatEmployee;
