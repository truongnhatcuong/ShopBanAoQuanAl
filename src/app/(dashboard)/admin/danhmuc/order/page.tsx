"use client";
import React, { useEffect, useState } from "react";
import PageListOrder from "./components/TableOrder";

const Page = () => {
  const [order, setOrder] = useState([]);
  async function FetchApiOrder() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order`);
    const data = await res.json();
    setOrder(data.manageOrder);
  }

  useEffect(() => {
    FetchApiOrder();
  }, []);
  return (
    <div>
      <PageListOrder orders={order} reloadData={FetchApiOrder} />
    </div>
  );
};

export default Page;
