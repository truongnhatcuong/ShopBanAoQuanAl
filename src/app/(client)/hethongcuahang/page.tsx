"use client";
import React, { useEffect, useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { BsFillSignTurnRightFill } from "react-icons/bs";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { AiFillInstagram } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { RiTimer2Fill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineAccessTime } from "react-icons/md";
import Link from "next/link";
import Aos from "aos";

const Page = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="md:h-[70vh] h-screen my-10">
      <div className="flex  flex-col md:flex-row  justify-center  gap-10  ">
        {" "}
        <div className="mx-2" data-aos="fade-right" data-aos-duration="2000">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.2843515910736!2d105.89187027471526!3d21.061302286661054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a997586f6a11%3A0xbf1482476dccc7bc!2zMiBQLiDDlCBDw6FjaCwgxJDhu6ljIEdpYW5nLCBMb25nIEJpw6puLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1736740624397!5m2!1svi!2s"
            width="600"
            height="450"
            loading="lazy"
          ></iframe>
        </div>
        <div
          className="rounded-md border border-gray-400 md:w-1/3 w-[90%] mx-auto "
          data-aos="fade-left"
          data-aos-duration="2000"
        >
          {/* gioi thieu */}
          <div>
            <h1 className="font-bold text-2xl text-start ml-5 mt-5 border-b pb-3 ">
              {" "}
              Giới Thiệu
            </h1>
            <p className="border-b-2 w-32 pb-2 ml-36 mt-4 text-sm ">
              JUST STAND OUT
            </p>
          </div>
          {/* chitiet */}
          <div className="flex flex-col gap-y-5 cursor-pointer">
            <div className="flex gap-2 items-center mt-2 ml-3">
              <RiErrorWarningFill className="text-xl" />
              <p className="text-gray-700 text-sm">
                <span className="text-lg font-bold text-gray-950 hover:border-b hover:border-black">
                  Trang
                </span>{" "}
                Cửa hàng quần áo nam
              </p>
            </div>
            <div className="flex gap-2 items-center    ml-3">
              <BsFillSignTurnRightFill className="text-xl" />
              <p className="text-gray-700 text-sm hover:border-b hover:border-black">
                Ô Cách, Long Biên , Hanoi, Vietnam
              </p>
            </div>
            <div className="flex gap-2 items-center    ml-3">
              <BsFillTelephoneOutboundFill className="text-xl" />
              <p className="text-gray-700 text-sm">098 398 59 89</p>
            </div>
            <div className="flex gap-2 items-center    ml-3">
              <MdEmail className="text-xl" />
              <p className="text-gray-700 text-sm">info.odinclub@gmail.com</p>
            </div>
            <div className="flex gap-2 items-center    ml-3">
              <AiFillInstagram className="text-2xl" />
              <Link
                href={
                  "https://www.instagram.com/odin.club_?fbclid=IwY2xjawHyk7JleHRuA2FlbQIxMAABHQgt1rRVu4P5C3ZmntPlbDU1hKnPqGzK-pLz2EnBgQ4XFpbjZZVVrdN_cg_aem_6XxMPogtdbu-5ZDa4LloAA"
                }
              >
                <p className="font-bold text-blue-800 hover:border-b hover:border-blue-800 ">
                  odin.club_
                </p>
              </Link>
            </div>
            <div className="flex gap-2 items-center    ml-3">
              <FaTiktok className="text-2xl" />
              <p className="font-bold text-blue-800 hover:border-b hover:border-blue-800 ">
                odin.club
              </p>
            </div>
            <div className="flex gap-2 items-center      ml-3">
              <FaEarthAmericas className="text-xl" />
              <Link
                href={
                  "https://shopee.vn/odinclothing?utm_campaign=-&utm_content=----&utm_medium=affiliates&utm_source=an_17351980011&utm_term=ce3pmgggkpc7"
                }
              >
                {" "}
                <p className="text-blue-600 hover:border-blue-700 hover:border-b">
                  shope.ee/8f4V2CKWrB
                </p>
              </Link>
            </div>
            <div className="flex gap-2 items-center ml-3">
              <RiTimer2Fill className="text-2xl text-gray-500" />
              <p className="font-sans text-green-600 hover:border-b hover:border-black ">
                luôn mở cửa
              </p>
              <IoIosArrowDown
                className="mt-1 text-gray-500"
                onClick={() => setIsOpen(true)}
              />
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-40">
          <div className="bg-white w-[500px] rounded-md shadow-lg p-6">
            <div className="flex justify-between items-center mb-4 border-b pb-4 border-gray-300 mx-2">
              <h2 className="text-2xl font-bold text-center w-full">
                Giờ hoạt động
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500  text-2xl hover:text-red-600"
              >
                &times;
              </button>
            </div>

            <div className="flex items-center gap-2">
              <MdOutlineAccessTime className="text-5xl text-gray-600" />
              <div>
                <h1 className="text-xl font-bold ">Giờ hoạt động</h1>
                <p className="font-sans text-green-600 hover:border-b hover:border-black ">
                  luôn mở cửa
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
