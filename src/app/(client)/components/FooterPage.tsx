import Link from "next/link";
import React from "react";
import { RiStore3Line } from "react-icons/ri";
import Image from "next/image";

const FooterPage = () => {
  return (
    <div className="flex flex-col sm:flex-row bg-gray-200 p-2  block1 mt-14 ">
      <div className="w-full md:w-1/4 sm:w-1/4 p-2 block">
        <div className=" flex flex-col items-center">
          <div className="icon">
            <Link href="/">
              <Image
                src="/Image/car.png"
                alt="CAR"
                height={50}
                width={50}
                className="bg-black rounded-full p-1 hover:rounded-md transform transition-transform duration-500 hover:rotate-360"
              />
            </Link>
          </div>
          <div className=" text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              MIỄN PHÍ GIAO HÀNG
            </h3>
            <p className="text-gray-600">Với hoá đơn từ 300.000đ</p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/4 sm:w-1/4 p-2">
        <div className=" flex flex-col items-center">
          <div className="icon">
            <Link href="/">
              <Image
                src="/Image/box.png"
                alt="BOX"
                height={50}
                width={50}
                className="bg-black rounded-full p-1 hover:rounded-md transform transition-transform duration-500 hover:rotate-360"
              />
            </Link>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              3 NGÀY ĐỔI SẢN PHẨM
            </h3>
            <p className="text-gray-600">Đổi sản phẩm trong vòng 3 ngày</p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/4 sm:w-1/4 p-2">
        <div className=" flex flex-col items-center">
          <div className="icon">
            <Link href="/">
              <Image
                src="/Image/phone.png"
                alt="PHONE"
                height={50}
                width={50}
                className="bg-black rounded-full p-2 hover:rounded-md transform transition-transform duration-500 hover:rotate-360"
              />
            </Link>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800">HOTLINE</h3>
            <p className="text-gray-600">0000.123.456</p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/4 sm:w-1/4 p-2">
        <div className=" flex flex-col items-center">
          <div className="STORE">
            <Link href="/">
              <RiStore3Line className="bg-black rounded-full p-1 hover:rounded-md transform transition-transform duration-500 hover:rotate-360 text-white text-5xl" />
            </Link>
          </div>
          <div className="detail-sv text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              GIỜ LÀM VIỆC
            </h3>
            <p className="text-gray-600">9:00 - 23:59 hằng ngày</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterPage;
