/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Link from "next/link";
import Notification from "./Notification";

const Header = () => {
  return (
    <>
      <Notification />

      <div className="carousel w-full border-t-2 border-gray-300 border-solid	">
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src="https://pos.nvncdn.com/556e88-134541/bn/20230320_zk1SfSVA.png"
            className="w-full"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <Link href="#slide4" className="btn btn-circle">
              ❮
            </Link>
            <Link href="#slide2" className="btn btn-circle">
              ❯
            </Link>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="https://pos.nvncdn.com/556e88-134541/bn/20230320_tUs4bRsm.png"
            className="w-full"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <Link href="#slide1" className="btn btn-circle">
              ❮
            </Link>
            <Link href="#slide3" className="btn btn-circle">
              ❯
            </Link>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img
            src="https://pos.nvncdn.com/556e88-134541/bn/20221017_x7JisGPgEVYcRKKANWuNTn1x.png"
            className="w-full"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <Link href="#slide2" className="btn btn-circle">
              ❮
            </Link>
            <Link href="#slide4" className="btn btn-circle">
              ❯
            </Link>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img
            src="https://pos.nvncdn.com/556e88-134541/bn/20230320_6orPK57k.png"
            className="w-full"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <Link href="#slide3" className="btn btn-circle">
              ❮
            </Link>
            <Link href="#slide1" className="btn btn-circle">
              ❯
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
