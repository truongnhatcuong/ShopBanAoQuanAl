"use client";

import React, { useEffect, useState, useRef } from "react";
import Script from "next/script";
import { MessageCircleQuestion } from "lucide-react";
import { usePathname } from "next/navigation";

interface CozeConfig {
  bot_id: string;
}

interface CozeComponentProps {
  title: string;
}

declare global {
  interface Window {
    CozeWebSDK?: {
      WebChatClient: new (props: {
        config: CozeConfig;
        componentProps: CozeComponentProps;
      }) => void;
    };
  }
}

const CozeChat: React.FC = () => {
  const [isCozeLoaded, setIsCozeLoaded] = useState(false);
  const pathname = usePathname();
  const chatInstanceRef = useRef<any>(null);

  // Ẩn chatbox trên các trang admin, login, register
  const shouldHideChat =
    pathname === "/admin" ||
    pathname === "/Login" ||
    pathname === "/Register" ||
    pathname?.startsWith("/admin/");

  useEffect(() => {
    if (shouldHideChat) {
      cleanupChatWidget();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const initializeChat = () => {
    if (window.CozeWebSDK && !chatInstanceRef.current) {
      chatInstanceRef.current = new window.CozeWebSDK.WebChatClient({
        config: {
          bot_id: "7445946489404653576",
        },
        componentProps: {
          title: "Shop áo quần",
        },
      });
      setIsCozeLoaded(true);
    }
  };

  const cleanupChatWidget = () => {
    // Xóa widget chat khỏi DOM
    const chatElements = document.querySelectorAll(
      '[class*="coze"], [id*="coze"]'
    );
    chatElements.forEach((element) => element.remove());

    // Reset state
    setIsCozeLoaded(false);
    chatInstanceRef.current = null;
  };

  if (shouldHideChat) return null;

  return (
    <>
      {/* Tải script Coze bằng Next.js */}
      <Script
        src="https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/1.0.0-beta.4/libs/oversea/index.js"
        strategy="afterInteractive"
        onLoad={initializeChat}
      />

      {/* Giao diện chatbox */}
      {pathname === "/" && (
        <div className="fixed bottom-24 right-4 z-50 max-w-xs bg-white shadow-lg rounded-lg p-4 border flex items-start">
          <MessageCircleQuestion
            className="text-blue-600 mr-3 flex-shrink-0"
            size={24}
          />
          <div>
            <p className="text-sm font-medium text-gray-900 mb-2">
              Tư vấn bằng AI
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default CozeChat;
