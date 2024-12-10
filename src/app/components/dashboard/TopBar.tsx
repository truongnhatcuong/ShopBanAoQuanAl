/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopBar = () => {
  return (
    <div className="navbar bg-base-100 ">
      <div className="flex-1">
        <Link href="/admin">
          <button className="px-2 py-1 text-black prata-regular  text-2xl">
            Dashboard
          </button>
        </Link>
      </div>
      <div className="flex-none gap-2">
        {/* <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div> */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar mr-3"
          >
            <div className="w-10 rounded-full ">
              <Image
                src={"/Image/admin.jpg"}
                alt="Logo"
                width={100}
                height={50}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href={"#"} className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link href={"#"}>Settings</Link>
            </li>
            <li>
              <Link href={"/"}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
