"use client";
import Image from "next/image";
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
const ProfileUsername = () => {
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
    <div className="max-w-4xl mx-auto border text-black dark:text-white dark:bg-slate-800 border-gray-300 p-4  shadow-lg h-full ">
      <div className="mb-4">
        <h3 className="text-center text-xl font-semibold  ">
          Thông Tin Cá Nhân
        </h3>
        <p className="text-center text-sm text-gray-400 ">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </p>
      </div>
      {successMessage && (
        <p className="text-center text-green-500 my-4">{successMessage}</p>
      )}
      <div className="flex flex-col md:flex-row gap-5">
        <form onSubmit={UpdateHandle} className="w-full  md:w-2/3 mt-4">
          <div className="flex justify-around gap-4 md:gap-0  ">
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
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
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
              className="bg-green-500 text-white px-7 py-2  w-1/2 md:w-20  rounded hover:bg-green-600 text-center"
            >
              Lưu
            </button>
          </div>
        </form>
        {/* image */}
        <div className="md:w-1/3 mt-4 shadow-lg  w-full">
          <div className="flex justify-center mt-4">
            <Image
              src={"/Image/anhdaidien.jpg"}
              alt=""
              height={60}
              width={60}
              className="rounded-full "
            />
          </div>
          <div className=" mt-5 flex justify-center ">
            <label
              htmlFor="image-upload"
              className="border text-sm px-2 py-1 cursor-pointer"
            >
              Chọn ảnh
              <input
                type="file"
                id="image-upload"
                className="hidden"
                name="image"
              />
            </label>
          </div>
          <div className="text-sm text-gray-400 my-5 text-center">
            <p>Dụng lượng file tối đa 1 MB</p>
            <p>Định dạng:.JPEG, .PNG</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUsername;
