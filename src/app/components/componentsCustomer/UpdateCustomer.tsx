"use client";
import { FaPen } from "react-icons/fa";
import React, { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
interface ICustomer {
  customer_id: number;
  name: string;
  email: string;
  phone: number;
  address: string;
  username: string;
  password: string;
  reloadData: () => void;
}

const UpdateCustomer = (props: ICustomer) => {
  const MySwal = withReactContent(Swal);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState<string>(props.name);
  const [email, setEmail] = useState<string>(props.email);
  const [phone, setPhone] = useState<number | string>(props.phone);
  const [address, setAddress] = useState<string>(props.address);

  async function UpdateCustomerHandle(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/customer/${props.customer_id}`, {
      method: "PUT",
      headers: { "content-Type": "aplication/json" },
      body: JSON.stringify({ name, email, phone, address }),
    });

    if (res.ok) {
      setIsOpen(false);
      const data = await res.json();
      props.reloadData();
      MySwal.fire({
        position: "center",
        icon: "success",
        title: "Thay Đổi Thành Công",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const dataError = await res.json();
      setIsOpen(false);
      console.log(dataError);
      MySwal.fire({
        position: "center",
        icon: "error",
        title: Error || "Lỗi Khi Thêm Khách Hàng",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
  return (
    <div>
      <div className="text-blue-500 " onClick={() => setIsOpen(true)}>
        <FaPen />
      </div>
      <div>
        {isOpen && (
          <Modal
            isOpen={isOpen}
            ariaHideApp={false}
            onRequestClose={() => setIsOpen(false)}
            contentLabel="Thêm Khách Hàng"
            className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl mx-auto"
            overlayClassName="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-md"
          >
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Thay Đổi Thông Tin Khách Hàng
            </h2>
            <form className="space-y-4" onSubmit={UpdateCustomerHandle}>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Tên Khách Hàng
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên khách hàng..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-3 rounded-lg border border-gray-300 w-full focus:outline-none focus:border-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Nhập email khách hàng..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 rounded-lg border border-gray-300 w-full focus:outline-none focus:border-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Số Điện Thoại
                </label>
                <input
                  type="text"
                  placeholder="Nhập số điện thoại..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="p-3 rounded-lg border border-gray-300 w-full focus:outline-none focus:border-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Địa Chỉ
                </label>
                <input
                  type="text"
                  placeholder="Nhập địa chỉ..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="p-3 rounded-lg border border-gray-300 w-full focus:outline-none focus:border-blue-400"
                  required
                />
              </div>

              <div className="flex justify-end mt-6 space-x-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-400 focus:outline-none transition duration-150"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none transition duration-150"
                >
                  Lưu
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default UpdateCustomer;
