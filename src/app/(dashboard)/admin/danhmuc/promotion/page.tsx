"use client";
import React, { useEffect, useState } from "react";
import TablePromotion from "./components/TablePromotion";
import AddPrromotion from "./components/AddPromotion";

const Page = () => {
  const [promotion, setPromotion] = useState([]);
  async function fetchApi() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/promotion`);
    const data = await res.json();
    setPromotion(data.promotions);
  }
  useEffect(() => {
    fetchApi();
  }, []);
  return (
    <div>
      <div>
        <AddPrromotion reloadData={fetchApi} />
      </div>
      <div>
        <TablePromotion promotion={promotion} reloadData={fetchApi} />
      </div>
    </div>
  );
};

export default Page;
