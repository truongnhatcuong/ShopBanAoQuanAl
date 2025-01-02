"use client";
import React, { useEffect, useState } from "react";
import PageListOrder from "./components/TableOrder";

const Page = () => {
  const [order, setOrder] = useState([]);
  async function FetchApiOrder() {
    const res = await fetch(`/api/admin/manage/orderCustomer`);
    const data = await res.json();
    setOrder(data.orderCustomer);
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
