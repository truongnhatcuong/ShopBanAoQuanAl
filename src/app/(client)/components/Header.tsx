/* eslint-disable @next/next/no-img-element */
"use client";
import { GrNext, GrPrevious } from "react-icons/gr";
import React, { useState } from "react";

interface IImage {
  id: number;
  image: string;
}
const MangImage: IImage[] = [
  {
    id: 1,
    image: "https://intphcm.com/data/upload/banner-thoi-trang-nam.jpg",
  },
  {
    id: 2,
    image: "https://intphcm.com/data/upload/banner-thoi-trang-nam-dep.jpg",
  },
  {
    id: 3,
    image: "https://intphcm.com/data/upload/banner-thoi-trang-bi-an.jpg",
  },
];

const Header = () => {
  let [count, setCount] = useState<number>(0);
  function NextImage() {
    setCount((nextCount) => (nextCount + 1) % MangImage.length);
  }
  const previousImage = () => {
    setCount(
      (prevCount) => (prevCount - 1 + MangImage.length) % MangImage.length
    );
  };

  return (
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    <div className="relative flex justify-center">
      <div className="w-full">
        <img
          src={MangImage[count].image}
          alt="anh"
          className="w-full h-auto  object-cover max-w-screen "
        />
      </div>
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
        <button onClick={previousImage} className="text-white text-7xl">
          <GrPrevious />
        </button>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
        <button onClick={NextImage} className="text-white text-7xl">
          <GrNext />
        </button>
      </div>
    </div>
  );
};

export default Header;
