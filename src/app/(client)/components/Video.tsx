import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import { Pagination } from "swiper/modules";
import Image from "next/image";
const Video = () => {
  return (
    <>
      <div className="container mx-auto py-14 block1">
        <div className="text-center">
          <h1 className="text-4xl py-2 font-semibold">
            BỘ SƯU TẬP THƯƠNG HIỆU VÔ TẬN
          </h1>
          <p className="mb-10 text-gray-500">
            Bộ sưu tập là tập hợp các sản phẩm, tác phẩm, hoặc vật phẩm có chung
            chủ đề, phong cách, hoặc mục đích
          </p>
        </div>
        <div>
          <Swiper
            slidesPerView={3}
            spaceBetween={1}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper image "
          >
            <SwiperSlide className="cursor-grab">
              <Image src={"/Image/vd7.webp"} alt="" width={270} height={270} />
            </SwiperSlide>
            <SwiperSlide className="cursor-grab">
              <Image src={"/Image/vd2.webp"} alt="" width={250} height={250} />
            </SwiperSlide>
            <SwiperSlide className="cursor-grab">
              <Image src={"/Image/vd3.webp"} alt="" width={270} height={270} />
            </SwiperSlide>
            <SwiperSlide className="cursor-grab">
              <Image src={"/Image/vd4.webp"} alt="" width={270} height={270} />
            </SwiperSlide>
            <SwiperSlide className="cursor-grab">
              <Image src={"/Image/vd7.webp"} alt="" width={270} height={270} />
            </SwiperSlide>
            <SwiperSlide className="cursor-grab">
              <Image src={"/Image/vd6.webp"} alt="" width={270} height={270} />
            </SwiperSlide>
            <SwiperSlide className="cursor-grab">
              <Image src={"/Image/vd1.webp"} alt="" width={250} height={250} />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Video;
