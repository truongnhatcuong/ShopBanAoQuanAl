"use client";
import AddCustomer from "@/app/components/componentsCustomer/AddCustomer";
import TableCustomer from "@/app/components/componentsCustomer/TableCustomer";
import React, { useEffect, useState } from "react";

interface ICustomer {
  customer_id: number;
  name: string;
  email: string;
  phone: number;
  address: string;
  username: string;
  password: string;
}

const PageCustomer = () => {
  const [customer, SetCustomer] = useState<ICustomer[]>([]);
  async function ApiCustomer() {
    const req = await fetch("/api/customer");
    const data = await req.json();
    SetCustomer(data.getCustomer);
  }
  useEffect(() => {
    ApiCustomer();
  }, []);
  return (
    <div>
      <div>
        <AddCustomer reloadData={ApiCustomer} />
      </div>
      <div>
        <TableCustomer customer={customer} reloadData={ApiCustomer} />
      </div>
    </div>
  );
};

export default PageCustomer;
