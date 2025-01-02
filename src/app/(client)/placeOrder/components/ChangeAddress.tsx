"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineClose, MdOutlinePhoneInTalk } from "react-icons/md";

import DefaultAddress from "../../profile/components/DefaultAddress";
import PaymentMethodForm from "./FormPayMent";
import AddAddress from "../../profile/components/AddAddress";
import Title from "../../components/Title";

interface AddressShipper {
  address_id: number;
  customer_id: number;
  country: string;
  is_default?: boolean;
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

const ChangeAddress = () => {
  const [address, setAddress] = useState<CustomerAddress | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const [customer_id, setCustomer_id] = useState<number | null>(null);

  const FetchApi = async () => {
    const res = await fetch(`/api/addressShiper`);
    const data = await res.json();
    setAddress(data.addressShiper);
  };

  useEffect(() => {
    FetchApi();
  }, []);

  useEffect(() => {
    if (address?.AddressShipper) {
      const defaultAddress = address.AddressShipper.find(
        (addressShip) => addressShip.is_default === true
      );
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.address_id);
      }
    }
    setCustomer_id(Number(address?.AddressShipper[0]?.customer_id));
  }, [address]);

  return (
    <>
      <div className="text-center mt-3">
        <Title title1="THÔNG TIN" title2="GIAO HÀNG" />
      </div>
      <div className="w-full   bg-white shadow-lg ">
        <div className="flex justify-between">
          {address ? (
            <div className="">
              <p className="font-medium ml-2">
                {address.name} (+84) {address.phone}
              </p>
              {/* Hiển thị danh sách địa chỉ nếu có địa chỉ mặc định */}
              {address.AddressShipper.some(
                (addressShip) => addressShip.is_default
              ) && (
                <>
                  {address.AddressShipper.map(
                    (addressShip) =>
                      addressShip.is_default && (
                        <div
                          className="mb-3 ml-2 "
                          key={addressShip.address_id}
                        >
                          {addressShip.street_address},{addressShip.ward},{" "}
                          {addressShip.district}, {addressShip.province}
                          {addressShip.is_default && (
                            <span className="inline-block border border-red-500 text-red-600 px-1.5 py-1 text-xs rounded cursor-pointer ml-2">
                              Mặc Định
                            </span>
                          )}
                        </div>
                      )
                  )}
                </>
              )}
            </div>
          ) : (
            <p>Đang tải địa chỉ...</p>
          )}
          <div>
            <p
              className="text-sm text-blue-600 hover:underline mr-3 mb-2 cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              Thay Đổi
            </p>
            {isOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="w-[500px] bg-white rounded-lg p-6">
                  <div
                    className=" flex justify-end cursor-pointer mb-3"
                    onClick={() => setIsOpen(false)}
                  >
                    <MdOutlineClose className="text-2xl hover:text-red-600 cursor-pointer" />
                  </div>
                  <div className="flex justify-between my-3">
                    <h1 className="text-2xl font-medium ">Địa chỉ nhận hàng</h1>
                    <AddAddress reloadData={FetchApi} />
                  </div>
                  <div className="space-y-4 text-gray-600 dark:text-white">
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex gap-4 items-center">
                          <p className="font-medium">{address?.name}</p>
                          <div className="flex items-center  gap-1">
                            <MdOutlinePhoneInTalk /> {address?.phone}
                          </div>
                        </div>
                      </div>
                      {address?.AddressShipper.map((addressShip) => (
                        <div
                          key={addressShip.address_id}
                          className="border-b py-2"
                        >
                          <div className="flex justify-between">
                            <div className=" mb-3">
                              {addressShip.street_address}
                              <br />
                              {addressShip.ward}, {addressShip.district},{" "}
                              {addressShip.province}
                            </div>
                            <div className="flex gap-3"></div>
                          </div>
                          <div className="flex justify-between items-center mb-5">
                            {addressShip.is_default ? (
                              <span className="inline-block border border-red-500 text-red-600 px-2 py-1 text-sm rounded cursor-pointer">
                                Mặc Định
                              </span>
                            ) : (
                              <DefaultAddress
                                address_id={addressShip.address_id}
                                reloadData={FetchApi}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <PaymentMethodForm
          addressId={Number(selectedAddressId)}
          customerId={Number(customer_id)}
        />
      </div>
    </>
  );
};

export default ChangeAddress;
