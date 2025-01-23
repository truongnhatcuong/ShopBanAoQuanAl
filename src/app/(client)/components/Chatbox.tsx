"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircleQuestion } from "lucide-react";

// Previous interfaces remain the same
interface CozeConfig {
  bot_id: string;
}

interface CozeComponentProps {
  title: string;
}

interface CozeWebChatClientProps {
  config: CozeConfig;
  componentProps: CozeComponentProps;
}

declare global {
  interface Window {
    CozeWebSDK?: {
      WebChatClient: new (props: CozeWebChatClientProps) => void;
    };
  }
}

const CozeChat: React.FC = () => {
  const [isCozeLoaded, setIsCozeLoaded] = useState(false);
  const pathname = usePathname();

  // Check if the current route is the admin dashboard

  useEffect(() => {
    // Create script element for Coze SDK
    const script = document.createElement("script");
    script.src =
      "https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/1.0.0-beta.4/libs/oversea/index.js";
    script.async = true;

    script.onload = () => {
      // Check if CozeWebSDK is available
      if (window.CozeWebSDK) {
        // Initialize Coze Web Chat Client
        new window.CozeWebSDK.WebChatClient({
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

    // Handle potential script loading errors
    script.onerror = () => {
      console.error("Failed to load Coze SDK");
    };

    // Append script to document
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      document.body.removeChild(script);
    };
  }, [pathname]);

  if (pathname !== "/") return;

  return (
    <>
      {pathname === "/" && (
        <div>
          <div id="coze-chat-container"></div>
          <div
            className={`fixed bottom-24 right-4 z-50 max-w-xs bg-white shadow-lg rounded-lg p-4 border flex items-start`}
          >
            <MessageCircleQuestion
              className="text-blue-600 mr-3  flex-shrink-0"
              size={24}
            />
            <div>
              <p className="text-sm font-medium text-gray-900 mb-2">
                Tư vấn bằng Ai
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CozeChat;
