import React from "react";

interface SelectFormProps {
  sortField: string;
  sortOrder: string;
  onSortChange: (sortField: string, sortOrder: string) => void;
}

const SelectForm = ({
  sortField,
  sortOrder,
  onSortChange,
}: SelectFormProps) => {
  return (
    <div className="mr-12">
      <select
        className="border-b-2 border-black p-3 rounded-none text-sm outline-none cursor-pointer"
        value={sortField && sortOrder ? `${sortField}-${sortOrder}` : ""}
        onChange={(e) => {
          const [field, order] = e.target.value.split("-");
          if (field && order) {
            onSortChange(field, order);
          }
        }}
      >
        <option value="created_at-desc" className="text-xs">
          Mới Nhất
        </option>
        <option value="price-asc" className="text-xs">
          Giá Tăng Dần
        </option>
        <option value="price-desc" className="text-xs">
          Giá Giảm Dần
        </option>
        <option value="product_name-asc" className="text-xs">
          Từ A đến Z
        </option>
        <option value="product_name-desc" className="text-xs">
          Từ Z đến A
        </option>
      </select>
    </div>
  );
};

export default SelectForm;
