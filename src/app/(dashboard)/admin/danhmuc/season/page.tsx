"use client";
import Addseason from "@/app/components/ComponentsSeason/Addseason";
import TableCardSeason from "@/app/components/ComponentsSeason/TableCardSeason";
import UpdateSeason from "@/app/components/ComponentsSeason/UpdateSeason";
import React, { useEffect, useState } from "react";

interface Iseason {
  season_id: number;
  season_name: string;
  description: string;
}

const Page = () => {
  const [season, setSeason] = useState<Iseason[]>([]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [selectseason, setSelectseason] = useState<Iseason | null>(null);

  const ApiSeason = async () => {
    const req = await fetch(`/api/season`);
    const data = await req.json();
    setSeason(data.season || []);
    console.log(data);
  };

  useEffect(() => {
    ApiSeason();
  }, []);

  const closeIsOpen = (season: Iseason) => {
    setSelectseason(season);
    setShowUpdateModal(true);
  };

  return (
    <div>
      <div className="flex justify-end  mr-7">
        <button
          className="bg-green-500 p-2 rounded-lg text-sm font-bold text-white hover:bg-green-700"
          onClick={() => setShowAddModal(true)}
        >
          Add season
        </button>
        {showAddModal && (
          <Addseason
            closeHandle={() => setShowAddModal(false)}
            reloadData={ApiSeason}
          />
        )}
      </div>
      <div>
        <TableCardSeason season={season} closeHandle={closeIsOpen} />
        {showUpdateModal && selectseason && (
          <UpdateSeason
            closeHandle={() => setShowUpdateModal(false)}
            season={selectseason}
            reloadData={ApiSeason}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
