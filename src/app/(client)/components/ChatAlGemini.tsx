"use client";
/* eslint-disable @next/next/no-img-element */
import { BotMessageSquare, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Định nghĩa interface cho dữ liệu
interface Message {
  text: string;
  sender: "user" | "bot";
  products?: Product[];
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  stock: number;
}

interface ChatResponse {
  message?: string;
  reply?: string;
  products?: Product[];
  result?: { text: string }[];
}

const ChatAlGemini = () => {
  const pathname = usePathname();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Gửi tin nhắn đến backend
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Thêm tin nhắn của người dùng
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data: ChatResponse = await response.json();

      // Xử lý phản hồi từ backend
      if (data.message) {
        setMessages((prev: any) => [
          ...prev,
          { text: data.message, sender: "bot" },
        ]);
      } else if (data.products) {
        setMessages((prev) => [
          ...prev,
          { text: data.reply || "", sender: "bot", products: data.products },
        ]);
      } else if (data.result) {
        const replyText =
          data.result[0]?.text || "Tôi không hiểu câu hỏi của bạn.";
        setMessages((prev) => [...prev, { text: replyText, sender: "bot" }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { text: data.reply || "Có lỗi xảy ra.", sender: "bot" },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Lỗi kết nối, vui lòng thử lại.", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };
  if (pathname !== "/") {
    return null; // Trả về null nếu không phải trang chủ
  }

  return (
    <div className="fixed bottom-[100px] right-[34px]  z-50">
      <div
        className={`relative  cursor-pointer ${
          isOpen ? "hidden" : "inline-block"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <BotMessageSquare className="w-10 h-10 text-blue-500 animate-bounce" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
          AI
        </span>
      </div>
      {isOpen && (
        <div className="  w-[450px] md:h-[610px] bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 text-center rounded-t-lg flex justify-between">
            <h3 className="text-lg font-semibold">Al assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex mb-3 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.sender === "bot" ? (
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  ) : (
                    <p>{msg.text}</p>
                  )}
                  {msg.products && (
                    <div className="mt-2 space-y-2">
                      {msg.products.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center space-x-3 border p-2 rounded"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p>Giá: {product.price.toLocaleString()} VND</p>
                            <p>Kho: {product.stock} sản phẩm</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 p-3 rounded-lg">Đang xử lý...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={sendMessage}
            className="p-4 border-t border-gray-200 flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập câu hỏi của bạn..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Gửi
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatAlGemini;
