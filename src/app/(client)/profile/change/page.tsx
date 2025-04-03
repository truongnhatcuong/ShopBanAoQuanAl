"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ChangePasswordForm = () => {
  const [currentPassword, setCurrenPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorChange, setErrorChange] = useState("");
  const MySwal = withReactContent(Swal);

  // Thực hiện đổi mật khẩu
  async function changePasswordHandle(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ currentPassword, newPassword }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        await MySwal.fire({
          title: <strong>Đổi Mật Khẩu Thành Công!</strong>,
          html: "Mật khẩu mới của bạn đã được thay đổi thành công.",
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
          timer: 2500,
          timerProgressBar: true,
        });

        setCurrenPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setErrorChange(data.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      setErrorChange("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  }

  useEffect(() => {
    if (errorChange) {
      const timer = setTimeout(() => {
        setErrorChange(""); // Ẩn lỗi sau 2.5 giây
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [errorChange]);

  return (
    <div className="max-w-4xl mx-auto border border-gray-300 dark:border-gray-700 p-4 shadow-lg bg-white dark:bg-gray-800 min-h-screen md:min-h-fit">
      <h3 className="my-4 text-center text-2xl md:text-3xl font-extrabold uppercase tracking-wider text-gray-900 dark:text-white drop-shadow-lg">
        Đổi Mật Khẩu
      </h3>

      {/* Quy tắc đặt mật khẩu */}
      <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-md shadow-lg mb-6">
        <p className="text-lg md:text-xl text-green-950 dark:text-green-200 font-medium mb-2">
          <strong>Quy tắc đặt mật khẩu:</strong>
        </p>
        <ul className="list-disc pl-4 space-y-1 text-sm md:text-lg text-green-950 dark:text-green-200">
          <li className="flex items-start space-x-2">
            <span className="text-green-700 dark:text-green-400">✔</span>
            <span>Có từ 8 ký tự trở lên.</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-green-700 dark:text-green-400">✔</span>
            <span>
              Có ít nhất 1 ký tự viết hoa, 1 ký tự viết thường, 1 chữ số.
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-green-700 dark:text-green-400">✔</span>
            <span>Mật khẩu không được giống tên đăng nhập.</span>
          </li>
        </ul>
      </div>

      {/* Form đổi mật khẩu */}
      <form onSubmit={changePasswordHandle} className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-x-4">
          <label
            htmlFor="currentPassword"
            className="text-base md:text-xl font-medium text-gray-950 dark:text-gray-300 md:w-1/3"
          >
            Mật khẩu cũ:<span className="text-red-600">*</span>
          </label>
          <input
            type="password"
            id="currentPassword"
            required
            placeholder="Nhập mật khẩu hiện tại"
            value={currentPassword}
            onChange={(e) => setCurrenPassword(e.target.value)}
            className="w-full md:w-96 px-3 py-2 border border-gray-400 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm md:text-base"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-x-4">
          <label
            htmlFor="newPassword"
            className="text-base md:text-xl font-medium text-gray-950 dark:text-gray-300 md:w-1/3"
          >
            Mật khẩu mới:<span className="text-red-600">*</span>
          </label>
          <input
            type="password"
            id="newPassword"
            required
            placeholder="Nhập mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full md:w-96 px-3 py-2 border border-gray-400 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm md:text-base"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-x-4">
          <label
            htmlFor="confirmPassword"
            className="text-base md:text-xl font-medium text-gray-950 dark:text-gray-300 md:w-1/3"
          >
            Xác nhận mật khẩu mới:<span className="text-red-600">*</span>
          </label>
          <input
            type="password"
            id="confirmPassword"
            required
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full md:w-96 px-3 py-2 border border-gray-400 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm md:text-base"
          />
        </div>

        {/* Hiển thị lỗi */}
        {errorChange && (
          <div className="text-red-600 text-sm text-center">
            <p>{errorChange}</p>
          </div>
        )}

        {/* Nút submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-green-600 text-white font-extrabold text-lg rounded hover:bg-green-700 dark:hover:bg-green-500"
          >
            Đổi mật khẩu
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
