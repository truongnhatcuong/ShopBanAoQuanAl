"use client";
import React, { useState } from "react";
import { GrFormPreviousLink } from "react-icons/gr";
import Link from "next/link";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/navigation";

const Page = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<number | string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  async function registerApi(e: React.FormEvent) {
    e.preventDefault();
    if (
      !name ||
      !email ||
      !phone ||
      !username ||
      !password ||
      !confirmPassword
    ) {
      MySwal.fire({
        position: "center",
        icon: "warning",
        title: "Vui lòng nhập đầy đủ thông tin",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    if (password !== confirmPassword) {
      MySwal.fire({
        position: "center",
        icon: "error",
        title: "Mật khẩu xác nhận không khớp",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    // Dừng nếu mật khẩu không khớp
    const res = await fetch(`/api/auth/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, username, password }),
    });
    if (res.ok) {
      setName("");
      setEmail("");
      setPhone("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      MySwal.fire({
        position: "center",
        icon: "success",
        title: "Đăng kí thành công !",
        showConfirmButton: false,
        timer: 3000,
      });
      router.push("/login");
    } else {
      const dataError = await res.json();
      MySwal.fire({
        position: "center",
        icon: "error",
        title: dataError.message || "sảy ra lỗi khi đăng ký",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }
  return (
    <div className="flex items-center justify-center md:min-h-screen py-10 px-4 formImage">
      <div className="flex w-full max-w-7xl bg-white shadow-2xl rounded-lg overflow-hidden flex-col md:flex-row">
        {/* Left Panel */}
        <div className="md:w-2/5 bg-gradient-to-br from-gray-900 to-gray-800 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 text-white dark:text-white p-12 flex flex-col justify-center items-center">
          <h2 className="text-4xl font-bold mb-4 text-center">ĐĂNG KÝ</h2>
          <p className="text-center text-lg opacity-80 mb-8">
            Tạo tài khoản để trải nghiệm dịch vụ tốt nhất!
          </p>
          <div className="w-20 h-1 bg-white opacity-40 my-6 rounded-full"></div>
          <p className="text-center text-sm opacity-70 mt-2">
            Đã có tài khoản? Đăng nhập ngay để tiếp tục mua sắm và nhận ưu đãi
            hấp dẫn.
          </p>
        </div>

        {/* Right Panel - Form */}
        <div className="md:w-3/5 w-full p-10">
          <h3 className="text-2xl font-semibold mb-8 text-gray-800 dark:text-white">
            Thông tin đăng ký
          </h3>

          <form className="space-y-5" onSubmit={registerApi}>
            {/* Personal Information Section */}
            <div className="mb-6">
              <h4 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 font-medium">
                Thông tin cá nhân
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Họ tên"
                    className="w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Số điện thoại"
                    className="w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Account Information Section */}
            <div className="mb-6">
              <h4 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 font-medium">
                Thông tin tài khoản
              </h4>
              <div>
                <input
                  type="text"
                  placeholder="Tên đăng nhập"
                  className="w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <input
                    type="password"
                    placeholder="Mật khẩu"
                    className="w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    className="w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white font-bold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5"
              >
                Đăng Ký Ngay
              </button>
            </div>

            {/* Return Link */}
            <Link href={"/"}>
              <div className="flex items-center mt-6 text-gray-600 hover:text-gray-900 text-sm font-medium dark:text-gray-300 dark:hover:text-white transition duration-200">
                <GrFormPreviousLink className="mr-2" />
                <span>Quay Về Trang Chủ</span>
              </div>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
