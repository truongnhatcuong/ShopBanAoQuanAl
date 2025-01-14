import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import { Pagination } from "swiper/modules";
import Image from "next/image";
const Video = () => {
  return (
    <>
      <div className="container mx-auto py-10  my-10">
        <div className="text-center">
          <h1 className="text-4xl py-2 font-semibold text-red-500/80 prata-regular">
            BỘ SƯU TẬP THƯƠNG HIỆU VÔ TẬN
          </h1>
          <p className="mb-10 text-gray-500">
            Bộ sưu tập là tập hợp các sản phẩm, tác phẩm, hoặc vật phẩm có chung
            chủ đề, phong cách, hoặc mục đích
          </p>
        </div>
        <div>
          <Swiper
            slidesPerView={4}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2500"
            className="cursor-grab"
          >
            <SwiperSlide
              data-aos="flip-left"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1500"
            >
              <Image src={"/Image/vd7.webp"} alt="" width={270} height={270} />
            </SwiperSlide>
            <SwiperSlide
              data-aos="flip-left"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1500"
            >
              <Image src={"/Image/vd2.webp"} alt="" width={250} height={225} />
            </SwiperSlide>
            <SwiperSlide
              data-aos="flip-left"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1500"
            >
              <Image src={"/Image/vd3.webp"} alt="" width={270} height={270} />
            </SwiperSlide>
            <SwiperSlide
              data-aos="flip-left"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1500"
            >
              <Image src={"/Image/vd4.webp"} alt="" width={270} height={270} />
            </SwiperSlide>
            <SwiperSlide
              data-aos="flip-left"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1500"
            >
              <Image src={"/Image/vd7.webp"} alt="" width={270} height={270} />
            </SwiperSlide>
            <SwiperSlide
              data-aos="flip-left"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1500"
            >
              <Image src={"/Image/vd6.webp"} alt="" width={270} height={270} />
            </SwiperSlide>
            <SwiperSlide
              data-aos="flip-left"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1500"
            >
              <Image src={"/Image/vd1.webp"} alt="" width={250} height={225} />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Video;
