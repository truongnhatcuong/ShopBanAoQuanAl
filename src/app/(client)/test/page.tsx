"use client";
import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  function open() {
    setIsOpen(true);
    toast.success("mở thành công");
  }
  return (
    <div className="h-screen">
      <div onClick={open}>hi</div>
    </div>
  );
};

export default page;
