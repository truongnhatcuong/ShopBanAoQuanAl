import React, { useEffect, useState } from "react";
import DeleteSeason from "./DeleteSeason";
import { FaPen } from "react-icons/fa";
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

  return (
    <div className="overflow-x-auto p-3">
      <table className="min-w-full divide-y divide-gray-200 table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Season Name
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {seasonList.map((item) => (
            <tr key={item.season_id}>
              <td className="px-4 py-2 whitespace-nowrap">
                {item.season_name}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                {item.description}
              </td>
              <td className="px-4 py-2 whitespace-nowrap flex space-x-4">
                <DeleteSeason
                  DeleteHandler={(season_id: number) => {
                    setSeasonList(
                      seasonList.filter((item) => item.season_id !== season_id)
                    );
                  }}
                  season_id={item.season_id}
                />
                <button
                  className="text-blue-500  hover:text-blue-600  text-xl mb-1"
                  onClick={() => closeHandle(item)}
                >
                  <FaPen />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableCardSeason;
