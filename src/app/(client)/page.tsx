"use client";
import { useEffect, useState } from "react";
import CozeChat from "./components/Chatbox";
import Header from "./components/Banner";

import ProductSeller from "./components/ProductSeller";
import Video from "./components/Video";
import Banner from "./components/Banner";
import DesignShopLapTop from "./components/DesignShopLapTop";

const Page = () => {
  return (
    <>
      <Banner />
      <Video />

      <ProductSeller />
      <DesignShopLapTop />
      <CozeChat />
    </>
  );
};

export default Page;
