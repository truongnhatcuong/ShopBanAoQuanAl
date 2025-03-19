/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
interface IUpdate {
  name: string;
  phone: number | string;
  username: string;
  image: string;
  email: string;
}
const ProfileUsername = () => {
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null); // Xem trước ảnh
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<IUpdate>({
    name: "",
    phone: "",
    username: "",
    image: "",
    email: "",
  });

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const accessToken = window.localStorage.getItem("token");
    setToken(accessToken);
  }, []);

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert("File quá lớn! Vui lòng chọn ảnh nhỏ hơn 1MB.");
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
            setPreview(data.user.image);
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
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("phone", user.phone as string);
    if (image) {
      formData.append("files", image);
    }

    const res = await fetch("/api/auth/change-information", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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
    <div className="max-w-6xl mt-7 mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden h-[70vh]">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-white">
        <h2 className="text-2xl font-bold text-center">Thông Tin Cá Nhân</h2>
        <p className="text-center text-white/80 mt-2">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      ) : (
        <>
          {successMessage && (
            <div className="bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500 text-green-700 dark:text-green-300 p-4 my-4 mx-6">
              <p>{successMessage}</p>
            </div>
          )}

          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Image Section */}
              <div className="md:w-1/3 w-full bg-gray-50 dark:bg-slate-700/50 rounded-lg p-6 flex flex-col items-center">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-emerald-500 shadow-md">
                    <img
                      src={preview || "/Image/anhdaidien.jpg"}
                      alt="Avatar"
                      height={96}
                      width={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                    <label
                      htmlFor="image-upload"
                      className="text-white cursor-pointer text-sm"
                    >
                      Thay đổi
                    </label>
                  </div>
                </div>

                <label
                  htmlFor="image-upload"
                  className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-full text-sm hover:bg-emerald-600 transition-colors duration-300 cursor-pointer"
                >
                  Chọn ảnh
                  <input
                    type="file"
                    id="image-upload"
                    className="hidden"
                    name="image"
                    accept=".jpeg,.jpg,.png"
                    onChange={handleImageChange}
                  />
                </label>

                <div className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center space-y-1">
                  <p>Dụng lượng file tối đa 1 MB</p>
                  <p>Định dạng: .JPEG, .PNG</p>
                </div>
              </div>

              {/* Form Section */}
              <div className="md:w-2/3 w-full">
                <form onSubmit={UpdateHandle} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Họ Và Tên <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={user?.name || ""}
                          onChange={(e) =>
                            setUser({ ...user, name: e.target.value })
                          }
                          className="w-full py-2 px-3 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 dark:text-white"
                          placeholder="Nhập họ và tên"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Số Điện Thoại <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={user?.phone || ""}
                          onChange={(e) =>
                            setUser({ ...user, phone: e.target.value })
                          }
                          className="w-full py-2 px-3 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 dark:text-white"
                          placeholder="Nhập số điện thoại"
                        />
                      </div>
                      {/* địa chỉ mặc đỉnh */}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Tài Khoản
                        </label>
                        <input
                          type="text"
                          disabled
                          value={user.username || ""}
                          className="w-full py-2 px-3 bg-gray-100 dark:bg-slate-600 border border-gray-300 dark:border-slate-700 rounded-md text-gray-500 dark:text-gray-400 cursor-not-allowed"
                          placeholder="Vô hiệu hóa"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email
                        </label>
                        <input
                          type="text"
                          disabled
                          value={user.email || ""}
                          className="w-full py-2 px-3 bg-gray-100 dark:bg-slate-600 border border-gray-300 dark:border-slate-700 rounded-md text-gray-500 dark:text-gray-400 cursor-not-allowed"
                          placeholder="Vô hiệu hóa"
                        />
                      </div>

                      <div className="  flex items-end justify-start mr-7">
                        <button
                          type="submit"
                          className="bg-emerald-500 text-white px-6 py-2 rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-300 flex items-center gap-2"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                              <span>Đang xử lý...</span>
                            </>
                          ) : (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>
                                {" "}
                                {loading ? "Đang xử lý..." : "Lưu thông tin"}
                              </span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileUsername;
