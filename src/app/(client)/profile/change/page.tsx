"use client";
import { useState } from "react";

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState(""); // Trường nhập lại mật khẩu mới
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }

    const token = localStorage.getItem("token"); // Lấy token từ localStorage hoặc cookie

    if (!token) {
      setErrorMessage("Bạn cần đăng nhập để thay đổi mật khẩu");
      return;
    }

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Gửi token trong header Authorization
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Mật khẩu đã được thay đổi thành công");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword(""); // Reset lại trường xác nhận mật khẩu
      } else {
        setErrorMessage(data.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Đổi mật khẩu</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block mb-1 text-sm font-medium"
            htmlFor="currentPassword"
          >
            Mật khẩu hiện tại
          </label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            className="block mb-1 text-sm font-medium"
            htmlFor="newPassword"
          >
            Mật khẩu mới
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            className="block mb-1 text-sm font-medium"
            htmlFor="confirmNewPassword"
          >
            Nhập lại mật khẩu mới
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          {errorMessage && (
            <div className="text-red-600 text-sm">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="text-green-600 text-sm">{successMessage}</div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Đổi mật khẩu
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
