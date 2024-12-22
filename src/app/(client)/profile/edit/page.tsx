"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
interface IUpdate {
  name: string;
  phone: number | string;
  address: string;
  username: string;
  email: string;
}
const ProfileUpdate = () => {
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<IUpdate>({
    name: "",
    phone: "",
    address: "",
    username: "",
    email: "",
  });
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const accessToken = window.localStorage.getItem("token");
    setToken(accessToken);
  }, []);

  useEffect(() => {
    if (token) {
      async function getApiCustomer() {
        try {
          const res = await fetch("/api/auth/user/profile", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Gửi token qua Header
            },
          });
          if (res.ok) {
            const data = await res.json();
            setUser(data.user);
          }
        } catch (error: any) {
          console.log(error);
        }
      }

      getApiCustomer();
    }
  }, [token]);

  async function UpdateHandle(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/change-information", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: user?.name,
        phone: user?.phone,
        address: user?.address,
      }),
    });
    const data = await res.json();

    if (res.ok) {
      MySwal.fire({
        title: "<strong>Cập Nhật Thành Công</strong>",
        html: "Thông tin của bạn đã được cập nhật thành công!",
        icon: "success",
        showConfirmButton: true,
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
        timer: 2500,
        timerProgressBar: true,
      });
    } else {
      setSuccessMessage("Cập nhật thất bại. Vui lòng thử lại.");
    }
  }

  return (
    <div className="max-w-3xl mx-auto border text-black dark:text-white dark:bg-slate-800 border-gray-300 p-4 rounded-md shadow-lg my-4">
      <h3 className="text-center text-xl font-semibold my-4">
        Thông Tin Cá Nhân
      </h3>
      {successMessage && (
        <p className="text-center text-green-500 my-4">{successMessage}</p>
      )}
      <form onSubmit={UpdateHandle}>
        <div className="flex justify-around">
          <div className="space-y-4">
            <div className="mb-4">
              <label className="text-sm">
                Họ Và Tên:<span className="text-red-600">*</span>
              </label>
              <br />
              <input
                type="text"
                required
                value={user?.name || ""}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full py-1 px-2 dark:bg-slate-700 dark:text-white focus:text-gray-900 border-b-2 border-black focus:outline-none"
                placeholder="Nhập họ và tên"
              />
            </div>
            <div className="mb-4">
              <label className="text-sm">
                Số Điện Thoại:<span className="text-red-600">*</span>
              </label>
              <br />
              <input
                type="text"
                required
                value={user?.phone || ""}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                className="w-full py-1 px-2 dark:bg-slate-700 dark:text-white focus:text-gray-900 border-b-2 border-black focus:outline-none"
                placeholder="Nhập số điện thoại"
              />
            </div>
            <div className="mb-4">
              <label className="text-sm">
                Địa Chỉ:<span className="text-red-600">*</span>
              </label>
              <br />
              <input
                type="text"
                required
                value={user?.address || ""}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
                className="w-full py-1 px-2 dark:bg-slate-700 dark:text-white border-b-2 border-black focus:outline-none"
                placeholder="Nhập địa chỉ"
              />
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label className="text-sm">
                Tài Khoản:<span className="text-red-600">*</span>
              </label>
              <br />
              <input
                type="text"
                required
                disabled
                value={user.username || ""}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="w-full py-1 px-2 text-gray-700 dark:bg-slate-700 dark:text-white border-b-2 border-black focus:outline-none"
                placeholder="Vô hiệu hóa"
              />
            </div>
            <div className="mb-4">
              <label className="text-sm">
                Email:<span className="text-red-600">*</span>
              </label>
              <br />
              <input
                type="text"
                required
                disabled
                value={user.email || ""}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full py-1 px-2 text-gray-700 dark:bg-slate-700 dark:text-white border-b-2 border-black focus:outline-none"
                placeholder="Vô hiệu hóa"
              />
            </div>
          </div>
        </div>
        <div className="mt-5 flex justify-center">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-center"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdate;
