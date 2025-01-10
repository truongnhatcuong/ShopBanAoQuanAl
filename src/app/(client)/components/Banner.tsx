import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Banner = () => {
  const route = useRouter();

  return (
    <div className="container mx-auto px-4 mt-6">
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={50}
        slidesPerView={1}
        className="mySwiper"
      >
        {[1, 2, 3].map((slide) => (
          <SwiperSlide key={slide} className="border">
            <div className="grid lg:grid-cols-2 grid-cols-1 items-center gap-6 py-8">
              <div className="px-4 lg:ml-7 text-center lg:text-left">
                <h1 className="text-3xl lg:text-5xl py-4">
                  Cửa Hàng <span className="font-bold lg:ml-7">OdinClubs</span>
                </h1>
                <p className="text-sm lg:text-base pb-7 family ">
                  Shop OdinClub là địa chỉ thời trang đáng tin cậy, chuyên cung
                  cấp các sản phẩm phong cách hiện đại, chất lượng cao, giá cả
                  hợp lý, mẫu mã đa dạng, dịch vụ chuyên nghiệp và tận tâm phục
                  vụ.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
                  <Button
                    variant="default"
                    className="w-full sm:w-auto px-4 py-2 bg-black text-white rounded-md shadow-md hover:shadow-lg hover:scale-105 transition-all"
                  >
                    Khám Phá Ngay
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto px-4 py-2 shadow-md hover:shadow-lg hover:scale-105 transition-all"
                    onClick={() => route.push("/product")}
                  >
                    Xem Thêm
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src={`/Image/banner${slide}.${slide === 3 ? "jpg" : "png"}`}
                  alt=""
                  width={slide === 3 ? 330 : 500}
                  height={slide === 3 ? 330 : 500}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
