import Link from "next/link";
import React from "react";
import { RiStore3Line } from "react-icons/ri";
import Image from "next/image";

const FooterPage = () => {
  return (
    <div className="flex flex-col sm:flex-row mt-32 mb-5  ">
      <div
        className="w-full md:w-1/4 sm:w-1/4 p-2  "
        data-aos="fade-down"
        data-aos-easing="ease-out-back"
        data-aos-duration="1300"
      >
        <div className=" flex flex-col items-center border p-4 rounded-md ">
          <div className="icon ">
            <Link href="/">
              <Image
                src="/Image/car.png"
                alt="CAR"
                height={50}
                width={50}
                className="bg-black/80 rounded-full p-1 hover:rounded-md transform transition-transform duration-500 hover:rotate-360"
              />
            </Link>
          </div>
          <div className=" text-center">
            <h3 className="text-lg font-semibold text-red-600/80">
              MIỄN PHÍ GIAO HÀNG
            </h3>
            <p className="">
              Với hoá đơn từ{" "}
              <span className="dark:text-red-500 text-black font-bold text-xl">
                300.000đ
              </span>
            </p>
          </div>
        </div>
      </div>
      <div
        className="w-full md:w-1/4 sm:w-1/4 p-2 "
        data-aos="fade-down"
        data-aos-easing="ease-out-back"
        data-aos-duration="1450"
      >
        <div className=" flex flex-col items-center border p-4 rounded-md ">
          <div className="icon ">
            <Link href="/">
              <Image
                src="/Image/box.png"
                alt="BOX"
                height={50}
                width={50}
                className="bg-black/80 rounded-full p-1 hover:rounded-md transform transition-transform duration-500 hover:rotate-360"
              />
            </Link>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-red-600/80">
              ĐỔI SẢN PHẨM
            </h3>
            <p className="">
              Đổi trả trong vòng{" "}
              <span className="dark:text-red-500 text-black font-bold text-xl">
                3 ngày
              </span>
            </p>
          </div>
        </div>
      </div>
      <div
        className="w-full md:w-1/4 sm:w-1/4 p-2 "
        data-aos="fade-down"
        data-aos-easing="ease-out-back"
        data-aos-duration="1600"
      >
        <div className=" flex flex-col items-center border p-4 rounded-md ">
          <div className="icon ">
            <Link href="/">
              <Image
                src="/Image/phone.png"
                alt="PHONE"
                height={50}
                width={50}
                className="bg-black/80 rounded-full p-2 hover:rounded-md transform transition-transform duration-500 hover:rotate-360"
              />
            </Link>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-red-600/80">HOTLINE</h3>
            <p className="">
              <span className="dark:text-red-500 text-black font-bold text-xl">
                0000.123.456
              </span>
            </p>
          </div>
        </div>
      </div>
      <div
        className="w-full md:w-1/4 sm:w-1/4 p-2 "
        data-aos="fade-down"
        data-aos-easing="ease-out-back"
        data-aos-duration="1700"
      >
        <div className=" flex flex-col items-center border p-4 rounded-md ">
          <div className="STORE">
            <Link href="/hethongcuahang">
              <RiStore3Line className="bg-black/80 rounded-full p-1 hover:rounded-md transform transition-transform duration-500 hover:rotate-360 text-white text-5xl" />
            </Link>
          </div>
          <div className="detail-sv text-center">
            <h3 className="text-lg font-semibold text-red-600/80">
              GIỜ LÀM VIỆC
            </h3>
            <p className="">
              <span className="dark:text-red-500 text-black font-bold text-xl">
                {" "}
                9:00 - 23:59{" "}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterPage;
