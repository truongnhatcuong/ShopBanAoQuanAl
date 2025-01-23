"use client";
import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import ListAddress from "../components/ListAddress";
import AddAddress from "../components/AddAddress";

interface AddressShipper {
  address_id: number;
  country: string;
  is_default: boolean;
  province: string;
  district: string;
  ward: string;
  street_address: string;
  note?: string;
}

interface CustomerAddress {
  name: string;
  phone: string;
  AddressShipper: AddressShipper[]; // Đã sửa từ AddressShippers thành AddressShipper
}

const PageAddress = () => {
  // Khai báo trạng thái với kiểu CustomerAddress[]
  const [address, setAddress] = useState<CustomerAddress | null>(null);

  const FetchApi = async () => {
    const res = await fetch(`/api/addressShiper`);
    const data = await res.json();
    setAddress(data.addressShiper);
  };

  useEffect(() => {
    FetchApi();
  }, []);

  return (
    <div className="bg-slate-100 dark:bg-black h-full">
      <div className="max-w-4xl mx-auto border dark:border-gray-700 p-4 shadow-lg h-full bg-white dark:bg-gray-800">
        {/* Thêm địa chỉ */}
        <div className="flex justify-between border-b flex-col md:flex-row">
          <Title title1="Địa Chỉ " title2="Của Tôi" />
          <AddAddress reloadData={FetchApi} />
        </div>
        {/* Danh sách địa chỉ */}
        <div>
          {address ? (
            <ListAddress address={address} reloadData={FetchApi} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageAddress;
