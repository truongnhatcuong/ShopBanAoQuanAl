import React from "react";
interface ISeason {
  season_id: number;
  season_name: string;
}
interface ISeasonProps {
  season: ISeason[];
  season_id: number | null;
  onchangeSeason: (id: number) => void;
}
const SelectSeaSon = ({ season, season_id, onchangeSeason }: ISeasonProps) => {
  return (
    <div className="w-1/4">
      <label className="block text-sm font-semibold">
        Mùa
        <select
          value={season_id || ""}
          onChange={(e) => onchangeSeason(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-md p-2 "
          required
        >
          <option value={""} disabled>
            Chọn Mùa
          </option>
          {season.map((item) => (
            <option value={item.season_id} key={item.season_id}>
              {item.season_name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SelectSeaSon;
