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
  const [showmodal, setShowmodal] = useState<boolean>(false);
  const [selectseason, setSelectseason] = useState<Iseason | null>(null);
  useEffect(() => {
    const ApiSeason = async () => {
      const req = await fetch(`/api/season`);
      const data = await req.json();
      setSeason(data.season || []);
      console.log(data);
    };
    ApiSeason();
  }, []);

  const closeIsOpen = (season: Iseason) => {
    setSelectseason(season);
    setShowmodal(true);
  };

  return (
    <div>
      <div className="flex justify-end my-6 mr-7">
        <button
          className="btn btn-success text-white font-medium"
          onClick={() => setShowmodal(true)}
        >
          Add season
        </button>
        {showmodal && <Addseason closeHandle={() => setShowmodal(false)} />}
      </div>
      <div>
        <TableCardSeason
          season={season}
          closeHandle={closeIsOpen}
          setSeason={setSeason}
        />
        {showmodal && selectseason && (
          <UpdateSeason
            closeHandle={() => setShowmodal(false)}
            season={selectseason}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
