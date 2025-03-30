"use client";
import Addseason from "@/app/(dashboard)/admin/danhmuc/season/ComponentsSeason/Addseason";
import TableCardSeason from "@/app/(dashboard)/admin/danhmuc/season/ComponentsSeason/TableCardSeason";
import UpdateSeason from "@/app/(dashboard)/admin/danhmuc/season/ComponentsSeason/UpdateSeason";
import React, { useEffect, useState } from "react";

interface Iseason {
  season_id: number;
  season_name: string;
  description: string;
}

const Page = () => {
  const [season, setSeason] = useState<Iseason[]>([]);

  const [selectseason, setSelectseason] = useState<Iseason | null>(null);

  const ApiSeason = async () => {
    const req = await fetch(`/api/season`, {
      next: { revalidate: 500 },
    });
    const data = await req.json();
    setSeason(data.season || []);
  };

  useEffect(() => {
    ApiSeason();
  }, []);

  return (
    <div>
      <div className="flex justify-end mx-7">
        {" "}
        <Addseason reloadData={ApiSeason} />
      </div>
      <div>
        <TableCardSeason season={season} reloadData={ApiSeason} />
      </div>
    </div>
  );
};

export default Page;
