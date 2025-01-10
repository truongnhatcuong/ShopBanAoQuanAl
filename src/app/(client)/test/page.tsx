"use client";
import React, { useEffect, useState } from "react";
import PageTest from "./TestApi";

const Page = () => {
  const [promotion, setPromotion] = useState([]);
  async function fetchApi() {
    const res = await fetch("/api/promotion");
    const data = await res.json();
    setPromotion(data.promotions);
  }
  useEffect(() => {
    fetchApi();
  }, []);
  return (
    <div>
      <PageTest promotion={promotion} />
    </div>
  );
};

export default Page;
