/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import DeleteSeason from "./DeleteSeason";

interface Iseason {
  season_id: number;
  season_name: string;
  description: string;
}

interface ISeasonProps {
  season: Iseason[];
  closeHandle: (season: Iseason) => void;
}

const TableCardSeason = ({ season, closeHandle }: ISeasonProps) => {
  const [seasonList, setSeasonList] = useState(season);
  useEffect(() => {
    setSeasonList(season);
  }, [season]);
  function DeleteSeasonHadler(season_id: number) {
    setSeasonList(seasonList.filter((item) => item.season_id !== season_id));
  }

  return (
    <div className="flex flex-wrap gap-6 justify-center p-3 ">
      {seasonList.map((item) => (
        <div
          key={item.season_id}
          className="w-full md:w-1/2 lg:w-1/3 bg-slate-200 shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        >
          <div className="p-2">
            <h2 className="text-xl font-bold  text-gray-800">
              {item.season_name}
            </h2>
            <p className="text-gray-600">{item.description}</p>
            <div className="mt-2 flex justify-end space-x-3">
              <DeleteSeason
                DeleteHandler={DeleteSeasonHadler}
                season_id={item.season_id}
              />
              <button
                className="bg-blue-500 hover:bg-blue-600 p-1 text-white rounded-md transition-colors duration-200"
                onClick={() => closeHandle(item)}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableCardSeason;
