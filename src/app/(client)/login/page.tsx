"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoGoogle } from "react-icons/io";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/navigation";
import ExpiredStorage from "expired-storage";

const Page = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [expiredStorage, setExpiredStorage] = useState<ExpiredStorage | null>(
    null
  );
  const MySwal = withReactContent(Swal);
  const route = useRouter();
  useEffect(() => {
    setExpiredStorage(new ExpiredStorage(localStorage));
  }, []);
  async function loginApi(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );
    if (res.ok) {
      const data = await res.json();
      if (expiredStorage) {
        expiredStorage.setItem("token", data.token, 60 * 60 * 1000);
        expiredStorage.setItem("userId", data.id, 60 * 60 * 1000);
      }
      MySwal.fire({
        title: "<strong>Thành Công</strong>",
        html: "Bạn đã đăng nhập thành công. Chúc bạn một ngày tuyệt vời!",
        icon: "success",
        showConfirmButton: true,
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
        timer: 3500,
        timerProgressBar: true,
      });
      route.push("/");
      route.refresh();
    } else {
      const dataError = await res.json();
      setErrorMessage(
        dataError.message ||
          "Đăng nhập không thành công, vui lòng kiểm tra lại!"
      );
    }
  }
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(""); // Ẩn lỗi sau 3 giây
      }, 2500); // 3 giây

      return () => clearTimeout(timer); // Dọn dẹp khi component unmount hoặc errorChange thay đổi
    }
  }, [errorMessage]);
  return (
    <>
      <div className="flex justify-center items-center min-h-screen md:py-10 md:px-4   dark:bg-gray-900">
        <div className="flex w-full max-w-7xl bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden flex-col md:flex-row">
          {/* Left side - Welcome section */}
          <div className="w-full md:w-1/2 p-12 bg-gradient-to-br from-gray-900 to-gray-800 text-white dark:from-indigo-900 dark:to-purple-900 flex flex-col justify-center items-center">
            <div className="max-w-md mx-auto text-center">
              <h2 className="text-5xl font-bold mb-6">ĐĂNG NHẬP</h2>
              <p className="text-xl opacity-90 mb-8">
                Tham gia để nhận các ưu đãi đặc biệt và trải nghiệm tốt nhất cho
                việc mua sắm của bạn.
              </p>
              <div className="hidden md:block mt-8">
                <div className="h-2 w-20 bg-white opacity-50 mx-auto rounded-full mb-6"></div>
                <p className="text-lg italic">
                  Khám phá bộ sưu tập thời trang mới nhất và độc đáo nhất
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Form section */}
          <div className="md:w-1/2 w-full p-10 md:p-12 bg-white dark:bg-gray-800 dark:text-white">
            <h3 className="text-2xl font-semibold mb-8 text-center md:text-left dark:text-white">
              Chào mừng trở lại
            </h3>

            <form className="space-y-6" onSubmit={loginApi}>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-lg py-4 px-5 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-400 dark:text-white transition duration-300"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-lg py-4 px-5 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-400 dark:text-white transition duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {errorMessage && (
                <div className="text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                  {errorMessage}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-4 px-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  Đăng Nhập
                </button>
              </div>
            </form>

            <div className="flex justify-between mt-6">
              <p>
                <span className="text-sm mr-1 text-gray-600 dark:text-gray-300">
                  Chưa có tài khoản?
                </span>
                <Link
                  href={"/signUp"}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 font-medium text-sm"
                >
                  Đăng ký ngay
                </Link>
              </p>
              <p>
                <Link
                  href={"/quen-mat-khau"}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 font-medium text-sm"
                >
                  Quên Mật Khẩu ?
                </Link>
              </p>
            </div>

            <div className="relative flex items-center my-8">
              <div className="border-t border-gray-300 dark:border-gray-700 flex-grow"></div>
              <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400">
                Hoặc
              </span>
              <div className="border-t border-gray-300 dark:border-gray-700 flex-grow"></div>
            </div>

            <div className="space-y-4">
              <Link
                href={"/"}
                className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md transition duration-300"
              >
                <span className="mr-3 text-lg">
                  <FaFacebookF />
                </span>
                <span className="font-medium">Đăng nhập bằng Facebook</span>
              </Link>

              <Link
                href={"/sign-in"}
                className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white py-3.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 shadow-md transition duration-300"
              >
                <span className="mr-3 text-lg">
                  <IoLogoGoogle />
                </span>
                <span className="font-medium">Đăng nhập bằng Google</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
