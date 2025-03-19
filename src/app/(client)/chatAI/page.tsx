"use client";
import Aos from "aos";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
interface Message {
  text: string;
  sender: "user" | "ai";
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    Aos.init();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input,
      sender: "user",
    };

    setMessages((prev: any) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Call API
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      const aiMessage: Message = {
        text: data.result || "Không có phản hồi từ AI.",
        sender: "ai",
      };

      setMessages((prev: any) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] mt-7 bg-black/90 ">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 shadow-lg">
        <h1 className="text-2xl font-bold text-white text-center">
          Al Chat Hỗ Trợ
        </h1>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <p>Bắt đầu cuộc trò chuyện với AI</p>
          </div>
        )}

        {messages.map((message: any, index: any) => (
          <div
            key={index}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`bg-${
                message.sender === "user"
                  ? "blue-600 max-w-xs"
                  : "gray-700 w-full max-w-6xl"
              } text-white rounded-lg p-3 `}
            >
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-700 text-white rounded-lg rounded-bl-none p-3 max-w-xs">
              <div className="flex space-x-2">
                <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-700 p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập tin nhắn của bạn..."
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200"
          >
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
}
