"use client";
import CozeChat from "./components/Chatbox";
import ProductSeller from "./components/ProductSeller";
import Video from "./components/Video";
import Banner from "./components/Banner";
import DesignShopLapTop from "./components/DesignShopLapTop";
import FooterPage from "./components/FooterPage";
import AOS from "aos";
import { useEffect, useState } from "react";
import Notification from "./components/Notification";
import ProductRecommendations from "./components/Productrecommen";
import ChatAlGemini from "./components/ChatAlGemini";
import ChatEmployee from "./components/ChatEmployee";
import ChatBoxSelect from "./test/page";
import SocalMedia from "./components/SocalMedia";

const Page = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Notification />
      <Banner />
      <FooterPage />
      <ProductRecommendations />
      <ProductSeller />
      <Video />
      <DesignShopLapTop />
      {/* <CozeChat /> */}
      <SocalMedia />
      <ChatEmployee />
      <ChatAlGemini />
    </>
  );
};

export default Page;
