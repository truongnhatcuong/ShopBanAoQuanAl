"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoGoogle } from "react-icons/io";
import { SignInButton, UserButton } from "@clerk/nextjs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/navigation";

const Page = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const MySwal = withReactContent(Swal);

  function setCookie(name: string, value: string, days: number) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000); // Cộng thêm ngày hết hạn
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;SameSite=strict`;
  }

  async function loginApi(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(`api/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      const data = await res.json();
      setUsername("");
      setPassword("");
      setCookie("token", data.accessToken, 1);
      setCookie("username", data.username, 1);
      MySwal.fire({
        position: "center",
        icon: "success",
        title: "Đăng Nhập thành công !",
        showConfirmButton: false,
        timer: 3000,
      });
      router.push("/");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      const dataError = await res.json();
      setErrorMessage(
        dataError.message ||
          "Đăng nhập không thành công, vui lòng kiểm tra lại!"
      );
    }
  }
  return (
    <div className="flex justify-center items-center h-screen mb-16">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col w-1/2 justify-center p-10 bg-gray-950 text-white items-center">
          <h2 className="text-4xl  font-semibold">ĐĂNG NHẬP </h2>
          <p className="text-center mt-4 text-sm opacity-80">
            Tham gia để nhận các ưu đãi đặc biệt và trải nghiệm tốt nhất.
          </p>
        </div>

        <div className="w-1/2 p-8">
          <form className="space-y-6" onSubmit={loginApi}>
            {" "}
            <div className="">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="w-full border rounded  py-3 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="w-full border rounded py-3 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errorMessage && (
              <div className="text-red-500 text-sm">{errorMessage}</div>
            )}
            <div>
              <button
                type="submit"
                className="w-full bg-gray-950 hover:bg-gray-700 text-white font-bold py-4 px-5 rounded focus:outline-none focus:shadow-inherit"
              >
                Đăng Nhập
              </button>
            </div>
          </form>
          <div className="flex justify-between  mt-4">
            <Link href={"/"} className="text-blue-500 hover:text-blue-700">
              Quên Mật Khẩu?
            </Link>
            <Link
              href={"/signUp"}
              className="text-blue-500 hover:text-blue-700"
            >
              Đăng Kí
            </Link>
          </div>
          <div className="relative flex items-center mb-3">
            <div className="border border-gray-400 flex-grow"></div>
            <span className="flex-shrink mx-4 text-gray-700 ">Hoặc</span>
            <div className="border border-gray-400 flex-grow"></div>
          </div>
          <div className="space-y-4">
            <Link
              href={"/"}
              className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white  py-3 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <span className="mr-2">
                <FaFacebookF />
              </span>
              <span> Đăng nhập bằng tài khoản facebook</span>
            </Link>
            <Link
              href={"/sign-in"}
              className="flex items-center justify-center bg-red-500 hover:bg-red-700 text-white  py-3 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <span className="mr-4">
                <SignInButton>
                  <IoLogoGoogle />
                </SignInButton>
              </span>
              <span> Đăng nhập bằng tài khoản google</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
