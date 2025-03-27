"use client";
import Addseason from "@/app/(dashboard)/admin/danhmuc/season/ComponentsSeason/Addseason";
import TableCardSeason from "@/app/(dashboard)/admin/danhmuc/season/ComponentsSeason/TableCardSeason";
import UpdateSeason from "@/app/(dashboard)/admin/danhmuc/season/ComponentsSeason/UpdateSeason";
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";

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
    const req = await fetch(`/api/season`, {
      cache: "force-cache",
      next: { revalidate: 500 },
    });
    const data = await req.json();
    setSeason(data.season || []);
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
          className="bg-blue-600 px-2 py-1 mt-4 font-bold text-white hover:bg-blue-700 flex items-center"
          onClick={() => setShowAddModal(true)}
        >
          <FiPlus /> <span>Thêm mới</span>
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
