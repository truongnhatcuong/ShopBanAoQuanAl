"use client";
import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { MessageCircleQuestion } from "lucide-react";

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
  const [showNotification, setShowNotification] = useState(true);
  const pathname = usePathname();
  const chatInstanceRef = useRef<any>(null);

  const shouldHideChat =
    pathname === "/admin" ||
    pathname === "/Login" ||
    pathname === "/Register" ||
    pathname?.startsWith("/admin/");

  // Function to clean up chat widget
  const cleanupChatWidget = () => {
    // Remove the script
    const existingScript = document.querySelector('script[src*="coze"]');
    if (existingScript?.parentNode) {
      existingScript.parentNode.removeChild(existingScript);
    }

    // Remove the chat widget
    const chatElements = document.querySelectorAll(
      '[class*="coze"], [id*="coze"]'
    );
    chatElements.forEach((element) => {
      if (element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    });

    // Reset the loaded state
    setIsCozeLoaded(false);
    chatInstanceRef.current = null;
  };

  useEffect(() => {
    // Clean up on route change if needed
    if (shouldHideChat && isCozeLoaded) {
      cleanupChatWidget();
      return;
    }

    // Don't load if should be hidden
    if (shouldHideChat) {
      return;
    }

    // Don't reload if already loaded
    if (isCozeLoaded) {
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/1.0.0-beta.4/libs/oversea/index.js";
    script.async = true;

    script.onload = () => {
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

    document.body.appendChild(script);

    // Cleanup function
    return () => {
      if (shouldHideChat) {
        cleanupChatWidget();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldHideChat, pathname]);

  // Watch for pathname changes to trigger cleanup
  useEffect(() => {
    if (shouldHideChat) {
      cleanupChatWidget();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const AiAdvisoryNotification = () => {
    if (shouldHideChat) return null;

    return (
      <div className="fixed bottom-24 right-4 z-50 max-w-xs bg-white shadow-lg rounded-lg p-4 border flex items-start">
        <MessageCircleQuestion
          className="text-blue-600 mr-3 flex-shrink-0"
          size={24}
        />
        <div>
          <p className="text-sm font-medium text-gray-900 mb-2">
            Tư vấn bằng Ai
          </p>
        </div>
      </div>
    );
  };

  if (shouldHideChat) {
    return null;
  }

  return (
    <>
      <div id="coze-chat-container"></div>
      <AiAdvisoryNotification />
    </>
  );
};

export default CozeChat;
