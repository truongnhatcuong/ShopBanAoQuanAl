"use client";
import CozeChat from "./components/Chatbox";
import ProductSeller from "./components/ProductSeller";
import Video from "./components/Video";
import Banner from "./components/Banner";
import DesignShopLapTop from "./components/DesignShopLapTop";
import FooterPage from "./components/FooterPage";
import AOS from "aos";
import { useEffect } from "react";
import Notification from "./components/Notification";
import ProductRecommendations from "./components/Productrecommen";

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
      <CozeChat />
    </>
  );
};

export default Page;
