/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { GrNext, GrPrevious } from "react-icons/gr";
import React, { useState } from "react";
import Link from "next/link";

// interface IImage {
//   id: number;
//   image: string;
// }
// const MangImage: IImage[] = [
//   {
//     id: 1,
//     image:
//       "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474102PNW/banner-thoi-trang-dang-cap-hien-dai_113856116.png",
//   },
//   {
//     id: 2,
//     image: "https://intphcm.com/data/upload/banner-thoi-trang-nam-dep.jpg",
//   },
//   {
//     id: 3,
//     image: "https://intphcm.com/data/upload/banner-thoi-trang-bi-an.jpg",
//   },
// ];

const Header = () => {
  //   let [count, setCount] = useState<number>(0);
  //   function NextImage() {
  //     setCount((nextCount) => (nextCount + 1) % MangImage.length);
  //   }
  //   const previousImage = () => {
  //     setCount(
  //       (prevCount) => (prevCount - 1 + MangImage.length) % MangImage.length
  //     );
  //   };

  return (
    <div className="carousel w-full">
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
  );
};

export default Header;
