"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import TableRate from "@/app/components/ComponentsRate/TableRate";
import React, { useEffect, useState } from "react";
interface Irate {
  rating_id: number;
  rating: number;
}
const page = () => {
  const [rate, setRate] = useState<Irate[]>([]);
  async function ApiRate() {
    const req = await fetch(`/api/rating`, { cache: "no-cache" });
    const data = await req.json();
    setRate(data.rating || []);
  }
  useEffect(() => {
    ApiRate();
  }, []);
  return (
    <div>
      <div>
        <TableRate rate={rate} />
      </div>
    </div>
  );
};

export default page;
