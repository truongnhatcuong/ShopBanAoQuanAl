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
      console.log(dataError);
      MySwal.fire({
        position: "center",
        icon: "error",
        title: "Đăng kí không thành công",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }
  return (
    <div className="flex  items-center justify-center mb-20 h-auto min-h-screen pt-20">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/*  */}

        <div className="sm:flex sm:flex-col hidden justify-center items-center sm:w-1/2 bg-gray-950 text-white p-10">
          <h2 className="text-4xl font-semibold">ĐĂNG KÍ</h2>
          <p className="text-center mt-4 text-sm opacity-80">
            Đăng kí tài khoản tại đây !
          </p>
        </div>
        <div className="sm:w-1/2 w-full p-8">
          <form className="space-y-6" onSubmit={registerApi}>
            <div>
              <input
                type="text"
                placeholder="Name"
                className="w-full px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-400 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="email"
                className="w-full px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-400 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="phone"
                className="w-full px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-400 rounded"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Username"
                className="w-full px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-400 rounded"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="password"
                className="w-full px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-400 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-400 rounded"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full mb-4 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800 bg-black text-white font-bold hover:bg-slate-900 rounded"
              >
                {" "}
                Đăng Kí
              </button>
            </div>
            <Link href={"/"}>
              <div className="flex items-center mt-6 text-sm ml-3">
                <GrFormPreviousLink />
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
