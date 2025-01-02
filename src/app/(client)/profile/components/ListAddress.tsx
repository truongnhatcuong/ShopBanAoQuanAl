import React from "react";
import { MdOutlinePhoneInTalk } from "react-icons/md";

import DefaultAddress from "./DefaultAddress";
import DeleteAddress from "./DeleteAddress";
import ViewAddress from "./ViewAddress";

// Định nghĩa kiểu dữ liệu cho AddressShipper
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
  AddressShipper: AddressShipper[];
}

interface ListAddressProps {
  address: CustomerAddress; // Đảm bảo rằng chúng ta truyền đúng dữ liệu vào
  reloadData: () => void;
}

const ListAddress = ({ address, reloadData }: ListAddressProps) => {
  // Dùng destructuring để nhận props
  return (
    <div className="space-y-4 text-gray-600 dark:text-white">
      <div className="border rounded-md p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex gap-4 items-center">
            <p className="font-medium">{address.name}</p>
            <div className="flex items-center  gap-1">
              <MdOutlinePhoneInTalk /> {address.phone}
            </div>
          </div>
        </div>
        {address.AddressShipper.map((addressShip) => (
          <div key={addressShip.address_id} className="border-b py-2">
            <div className="flex justify-between">
              <div className=" mb-3">
                {addressShip.street_address}
                <br />
                {addressShip.ward}, {addressShip.district},{" "}
                {addressShip.province}
              </div>
              <div className="flex gap-3">
                <ViewAddress
                  {...addressShip}
                  name={address.name}
                  phone={Number(address.phone)}
                />
                <DeleteAddress
                  address_id={addressShip.address_id}
                  reloadData={reloadData}
                />
              </div>
            </div>
            <div className="flex justify-between items-center mb-5">
              {addressShip.is_default ? (
                <span className="inline-block border border-red-500 text-red-600 px-2 py-1 text-sm rounded cursor-pointer">
                  Mặc Định
                </span>
              ) : (
                <DefaultAddress
                  address_id={addressShip.address_id}
                  reloadData={reloadData}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListAddress;
