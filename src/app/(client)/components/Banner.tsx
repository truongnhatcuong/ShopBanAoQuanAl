import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

const Banner = () => {
  const router = useRouter();

  const handleShopNow = () => {
    router.push("/product");
  };

  return (
    <div className=" my-20 perspective-1000 h-[60vh]">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
        className="mySwiper overflow-hidden rounded-xl shadow-lg h-[55vh]"
      >
        {/* Banner 1 - Thời trang hiện đại */}
        <SwiperSlide>
          <div className="flex h-full">
            <div className="flex items-center px-6 py-10 bg-gradient-to-r from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
              <div className="max-w-lg transform transition-all duration-700 hover:translate-y-2">
                <h2 className="text-lg md:text-xl font-medium text-red-600 mb-2">
                  PHONG CÁCH HIỆN ĐẠI
                </h2>
                <h1 className="prata-regular text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  Khám phá bộ sưu tập{" "}
                  <span className="text-red-600 underline decoration-2 underline-offset-4">
                    Xuân Hè 2025
                  </span>
                </h1>
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-200 leading-relaxed mb-6">
                  Tận hưởng phong cách thời thượng với những thiết kế độc đáo,
                  chất liệu cao cấp và đường may tinh tế. Nâng tầm phong cách cá
                  nhân của bạn cùng OdinClubs.
                </p>
                <Button
                  onClick={handleShopNow}
                  className="group bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full flex items-center gap-2"
                >
                  Mua sắm ngay
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </div>
            </div>
            <div className="relative h-full bg-gray-50 dark:bg-gray-800 overflow-hidden z-50">
              <Image
                src="/Image/banner-thoi-trang.jpg"
                alt="Thời trang hiện đại OdinClubs"
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 "
                priority
              />
              <div className="absolute bottom-4 right-4 bg-red-600/90 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Mới nhất
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Banner 2 - Xu hướng mùa */}
        <SwiperSlide>
          <div className="flex h-full">
            <div className="flex items-center px-6 py-10 bg-gradient-to-r from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
              <div className="max-w-lg transform transition-all duration-700 hover:translate-y-2">
                <h2 className="text-lg md:text-xl font-medium text-blue-600 mb-2">
                  XU HƯỚNG MÙA MỚI
                </h2>
                <h1 className="prata-regular text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  Thời trang{" "}
                  <span className="text-blue-600 underline decoration-2 underline-offset-4">
                    phá cách
                  </span>{" "}
                  cho người dẫn đầu
                </h1>
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-200 leading-relaxed mb-6">
                  Khẳng định cá tính với những thiết kế độc quyền tại OdinClubs.
                  Chúng tôi mang đến những xu hướng thời trang mới nhất giúp bạn
                  tự tin tỏa sáng mọi lúc.
                </p>
                <Button
                  onClick={handleShopNow}
                  className="group bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full flex items-center gap-2"
                >
                  Khám phá ngay
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </div>
            </div>
            <div className="relative h-full bg-gray-50 dark:bg-gray-800 overflow-hidden">
              <Image
                src="/Image/banner1.png"
                alt="Xu hướng thời trang OdinClubs"
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-4 right-4 bg-blue-600/90 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Bán chạy
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Banner 3 - Phong cách thiết kế */}
        <SwiperSlide>
          <div className="flex h-full">
            <div className="flex items-center px-6 py-10 bg-gradient-to-r from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
              <div className="max-w-lg transform transition-all duration-700 hover:translate-y-2">
                <h2 className="text-lg md:text-xl font-medium text-green-600 mb-2">
                  THIẾT KẾ ĐỘC ĐÁO
                </h2>
                <h1 className="prata-regular text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  Sự kết hợp giữa{" "}
                  <span className="text-green-600 underline decoration-2 underline-offset-4">
                    phong cách
                  </span>{" "}
                  và thoải mái
                </h1>
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-200 leading-relaxed mb-6">
                  Không chỉ đẹp mắt, trang phục OdinClubs còn mang đến cảm giác
                  thoải mái suốt ngày dài. Chất liệu cao cấp, thiết kế tinh tế
                  và đường may chắc chắn.
                </p>
                <Button
                  onClick={handleShopNow}
                  className="group bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full flex items-center gap-2"
                >
                  Tìm hiểu thêm
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </div>
            </div>
            <div className="relative h-full bg-gray-50 dark:bg-gray-800 overflow-hidden">
              <Image
                src="/Image/banner2.png"
                alt="Thiết kế độc đáo OdinClubs"
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-4 right-4 bg-green-600/90 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Giới hạn
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
