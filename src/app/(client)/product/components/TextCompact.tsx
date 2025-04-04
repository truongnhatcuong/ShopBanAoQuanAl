"use client";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
const TextCompact = ({ children }: any) => {
  const [isExpand, setIsExpand] = useState(false);

  const displayText = isExpand
    ? children
    : children.split(" ").slice(0, 40).join(" ") + "...";
  return (
    <span>
      <ReactMarkdown>{displayText}</ReactMarkdown>
      <span
        className="text-gray-700 dark:text-white border-b border-gray-700 leading-3 pb-1 cursor-pointer"
        onClick={() => setIsExpand(!isExpand)}
      >
        {children.length > 40 ? (isExpand ? "Thu gọn" : "Xem thêm") : ""}
      </span>
    </span>
  );
};

export default TextCompact;
