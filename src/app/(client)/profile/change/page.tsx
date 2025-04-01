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

  //thực hiện đổi mật khẩu
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
        setErrorChange(""); // Ẩn lỗi sau 3 giây
      }, 2500); // 3 giây

      return () => clearTimeout(timer); // Dọn dẹp khi component unmount hoặc errorChange thay đổi
    }
  }, [errorChange]);

  return (
    <div className="max-w-7xl mx-auto border border-gray-300 dark:border-gray-700 p-4 shadow-lg h-full bg-white dark:bg-gray-800">
      <h3 className="my-6 text-center text-3xl font-extrabold uppercase tracking-wider text-gray-900 dark:text-white drop-shadow-lg">
        Đổi Mật Khẩu
      </h3>
      <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-md shadow-lg mb-6">
        <p className="text-xl text-green-950 dark:text-green-200 font-medium mb-2">
          <strong>Quy tắc đặt mật khẩu:</strong>
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li className="text-lg text-green-950 dark:text-green-200 flex items-start space-x-2">
            <span className="text-green-700 dark:text-green-400">✔</span>
            <span>Có từ 8 ký tự trở lên.</span>
          </li>
          <li className="text-lg text-green-950 dark:text-green-200 flex items-start space-x-2">
            <span className="text-green-700 dark:text-green-400">✔</span>
            <span>
              Có ít nhất 1 ký tự viết hoa, 1 ký tự viết thường, 1 chữ số.
            </span>
          </li>
          <li className="text-lg text-green-950 dark:text-green-200 flex items-start space-x-2">
            <span className="text-green-700 dark:text-green-400">✔</span>
            <span>Mật khẩu không được giống tên đăng nhập.</span>
          </li>
        </ul>
      </div>
      <form onSubmit={changePasswordHandle}>
        <div className="mb-4 flex items-center gap-x-4">
          <label
            htmlFor=""
            className="block text-xl ml-7 font-medium w-1/3 text-gray-950 dark:text-gray-300"
          >
            Mật khẩu cũ:<span className="text-red-600">*</span>
          </label>
          <input
            type="password"
            required
            placeholder="Nhập mật khẩu hiện tại"
            value={currentPassword}
            onChange={(e) => setCurrenPassword(e.target.value)}
            className="w-96  px-3 py-2 border border-gray-400  rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div className="mb-4 flex items-center gap-x-4">
          <label
            htmlFor=""
            className="block text-xl ml-7 font-medium w-1/3 text-gray-950 dark:text-gray-300"
          >
            Mật khẩu mới:<span className="text-red-600">*</span>
          </label>
          <input
            type="password"
            required
            value={newPassword}
            placeholder="Nhập mật khẩu mới"
            onChange={(e) => setNewPassword(e.target.value)}
            className=" md:w-96 px-3 py-2 border border-gray-400 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div className="mb-4 flex items-center gap-x-4">
          <label
            htmlFor=""
            className=" text-xl ml-7 font-medium w-1/3 text-gray-950 dark:text-gray-300"
          >
            Xác nhận mật khẩu mới:<span className="text-red-600">*</span>
          </label>
          <input
            type="password"
            required
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="md:w-96   px-3 py-2 border border-gray-400 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        {/* hiển thị error */}
        <div className="text-red-600 text-sm mb-1 text-center">
          {errorChange && <p>{errorChange}</p>}
        </div>
        <div className="mb-4 flex justify-center items-center gap-x-4 ">
          <button
            type="submit"
            className="md:w-fit w-2/4 px-3 py-2 bg-green-600 text-white font-extrabold text-xl rounded hover:bg-green-700 dark:hover:bg-green-500 text-center"
          >
            Đổi mật khẩu
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
