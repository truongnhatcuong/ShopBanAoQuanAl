"use client";
import React, { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const AddCustomer = (props: { reloadData: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<number | string>("");
  const [address, setAddress] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const MySwal = withReactContent(Swal);

  const validateEmail = (email: string) => {
    const KTEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return KTEmail.test(email);
  };

  //POST Customer
  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return;
    }
    const res = await fetch(`http://localhost:3000/api/customer`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, address, username, password }),
    });
    //kiểm tra :
    if (res.ok) {
      const data = await res.json();
      props.reloadData();
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setUsername("");
      setPassword("");
      console.log(data);
      setIsOpen(false);
      MySwal.fire({
        position: "center",
        icon: "success",
        title: "Đã Thêm Khách Hàng",
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
  };

  return (
    <div>
      <div className="flex justify-end mr-7 mb-5">
        <button
          className="bg-blue-500 px-2.5 py-2 rounded-md text-white font-bold text-xl hover:bg-blue-600"
          onClick={() => setIsOpen(true)}
        >
          Thêm Khách Hàng
        </button>
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
              Thêm Khách Hàng Mới
            </h2>
            <form className="space-y-4" onSubmit={handleAddCustomer}>
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
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Tên Đăng Nhập
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên đăng nhập..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="p-3 rounded-lg border border-gray-300 w-full focus:outline-none focus:border-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Mật Khẩu
                </label>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  Thêm
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AddCustomer;
