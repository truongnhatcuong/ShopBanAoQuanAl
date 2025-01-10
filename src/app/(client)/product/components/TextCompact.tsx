"use client";
import React, { useState } from "react";

const TextCompact = ({ children }: any) => {
  const [isExpand, setIsExpand] = useState(false);

  const displayText = isExpand
    ? children
    : children.split(" ").slice(0, 40).join(" ") + "...";
  return (
    <span>
      {displayText}{" "}
      <button
        className="text-gray-700 dark:text-white border-b border-gray-700 leading-3 pb-1"
        onClick={() => setIsExpand(!isExpand)}
      >
        {isExpand ? "thu gọn" : "xem thêm"}
      </button>
    </span>
  );
};

export default TextCompact;
