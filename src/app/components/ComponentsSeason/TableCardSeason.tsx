/* eslint-disable @next/next/no-img-element */
import React from "react";
import DeleteSeason from "./DeleteSeason";

interface Iseason {
  season_id: number;
  season_name: string;
  description: string;
}
interface ISeasonProps {
  season: Iseason[];
  closeHandle: (season: Iseason) => void;
  setSeason: React.Dispatch<React.SetStateAction<Iseason[]>>;
}

const TableCardSeason = ({ season, closeHandle, setSeason }: ISeasonProps) => {
  function DeleteSeasonHadler(season_id: number) {
    setSeason(season.filter((item) => item.season_id !== season_id));
  }
  return (
    <div className="flex flex-wrap gap-4 justify-center ">
      {season.map((item) => (
        <div
          key={item.season_id}
          className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-md rounded-lg overflow-hidden  "
        >
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{item.season_name}</h2>
            <p className="text-gray-700">{item.description}</p>
            <div className="mt-4 flex justify-end space-x-2 ">
              <DeleteSeason
                DeleteHandler={DeleteSeasonHadler}
                season_id={item.season_id}
              />
              <button
                className="btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
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
