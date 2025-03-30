import React, { useEffect, useState } from "react";
import DeleteSeason from "./DeleteSeason";
import { FaRegEdit } from "react-icons/fa";
import UpdateSeason from "./UpdateSeason";

interface Iseason {
  season_id: number;
  season_name: string;
  description: string;
}

interface ISeasonProps {
  season: Iseason[];
  reloadData: () => void;
}

const TableCardSeason = ({ season, reloadData }: ISeasonProps) => {
  const [seasonList, setSeasonList] = useState(season);

  useEffect(() => {
    setSeasonList(season);
  }, [season]);

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-black text-white">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
              Season Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3  text-sm font-semibold uppercase tracking-wider ">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {seasonList.length > 0 ? (
            seasonList.map((item, index) => (
              <tr
                key={item.season_id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                  {item.season_name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {item.description}
                </td>
                <td className="px-4 py-2 flex space-x-4 justify-center">
                  <DeleteSeason
                    DeleteHandler={(season_id: number) => {
                      setSeasonList(
                        seasonList.filter(
                          (season) => season.season_id !== season_id
                        )
                      );
                    }}
                    season_id={item.season_id}
                  />
                  <UpdateSeason reloadData={reloadData} season={item} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={3}
                className="px-6 py-4 text-center text-gray-500 italic"
              >
                Không có dữ liệu.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableCardSeason;
