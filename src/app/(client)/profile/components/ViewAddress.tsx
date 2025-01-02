import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import Modal from "react-modal";
interface IGetOneAddress {
  address_id: number;
  country: string;
  province: string;
  district: string;
  ward: string;
  street_address: string;
  name: string;
  phone: number;
}

const ViewAddress = (props: IGetOneAddress) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-blue-500 hover:underline"
      >
        chi tiết
      </button>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center"
          overlayClassName="fixed inset-0 bg-black/50"
          ariaHideApp={false}
        >
          <div className=" w-[500px] bg-white p-4 rounded-md">
            <div
              className=" flex justify-end cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <MdOutlineClose className="text-2xl hover:text-red-600 " />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Thông Tin Địa Chỉ
            </h3>
            <div className="flex gap-5 mb-5">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Họ Và tên
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border-b "
                  disabled
                  defaultValue={props.name}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Số Điện Thoại (+84)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border-b "
                  disabled
                  defaultValue={props.phone}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">
                  Đất Nước
                </label>
                <div className="p-2 bg-gray-50 border border-gray-200 rounded-md">
                  {props.country}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">
                  Tỉnh/Thành Phố
                </label>
                <div className="p-2 bg-gray-50 border border-gray-200 rounded-md">
                  {props.province}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">
                  Quận/Huyện
                </label>
                <div className="p-2 bg-gray-50 border border-gray-200 rounded-md">
                  {props.district}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">
                  Phường/Xã
                </label>
                <div className="p-2 bg-gray-50 border border-gray-200 rounded-md">
                  {props.ward}
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className=" text-sm font-medium text-gray-600">
                  Địa Chỉ Cụ Thể
                </label>
                <div className="p-2 bg-gray-50 border border-gray-200 rounded-md">
                  {props.street_address}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ViewAddress;
