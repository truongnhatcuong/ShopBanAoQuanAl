import React from "react";

interface IBrand {
  brand_id: number;
  brand_name: string;
}
interface IBrandProps {
  brand: IBrand[];
  brand_id: number | null;
  onChangeBrand: (id: number) => void;
}
const SelectBrand = ({ brand, brand_id, onChangeBrand }: IBrandProps) => {
  return (
    <div className="w-1/4">
      <label className="block text-sm font-semibold">
        THƯƠNG HIỆU
        <select
          value={brand_id || ""}
          onChange={(e) => onChangeBrand(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-md p-2 "
          required
        >
          <option value={""} disabled>
            Chọn Thương Hiệu
          </option>
          {brand.map((item) => (
            <option value={item.brand_id} key={item.brand_id}>
              {item.brand_name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SelectBrand;
