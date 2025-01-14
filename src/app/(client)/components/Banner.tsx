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
    <div className="container mx-auto px-4 mt-6 ">
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={50}
        slidesPerView={1}
        className="mySwiper "
      >
        {[1, 2, 3].map((slide) => (
          <SwiperSlide
            key={slide}
            className="border-2  bg-blue-100/20 hover:bg-blue-100/10 p-4"
          >
            <div className="grid grid-cols-2  items-center gap-6 py-8">
              <div className="px-4 lg:ml-4 text-center lg:text-left">
                <div
                  data-aos="fade-right"
                  data-aos-duration="1000"
                  data-aos-easing="ease-in-out"
                >
                  <h1 className="text-2xl lg:text-5xl md:py-4 family mb-1  ">
                    Cửa Hàng
                  </h1>
                  <p className="prata-regular text-red-600/80 lg:ml-7 md:text-7xl text-3xl z-20">
                    OdinClubs
                  </p>
                  <p className="text-sm lg:text-base md:pb-7  family ">
                    Shop OdinClub là địa chỉ thời trang đáng tin cậy, chuyên
                    cung cấp các sản phẩm phong cách hiện đại, chất lượng cao.
                    <span className="hidden md:block">
                      {" "}
                      giá cả hợp lý, mẫu mã đa dạng, dịch vụ chuyên nghiệp và
                      tận tâm phục vụ.
                    </span>
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
                  <Button
                    variant="default"
                    data-aos-delay="50"
                    data-aos="fade-up-right"
                    data-aos-easing="ease-in-out"
                    data-aos-duration="1500"
                    className="w-full sm:w-auto px-4 py-2 bg-black bg-orange-600/90 hover:bg-orange-500 text-white rounded-md shadow-md hover:shadow-lg hover:scale-105 transition-all dark:bg-white dark:text-black"
                  >
                    Khám Phá Ngay
                  </Button>
                  <Button
                    variant="outline"
                    data-aos="fade-up-right"
                    data-aos-delay="50"
                    data-aos-easing="ease-in-out"
                    data-aos-duration="1500"
                    className="w-full sm:w-auto px-4 py-2 shadow-md hover:shadow-lg hover:scale-105 transition-all "
                    onClick={() => route.push("/product")}
                  >
                    Xem Thêm
                  </Button>
                </div>
              </div>
              <div
                className={`flex justify-center mt-5 md:mt-0`}
                data-aos="fade-left"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out-back"
              >
                <div className={` ${slide === 3 ? "mb-5" : ""}`}>
                  <Image
                    src={`/Image/banner${slide}.png`}
                    alt=""
                    width={slide === 3 ? 330 : 500}
                    height={slide === 3 ? 330 : 500}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
