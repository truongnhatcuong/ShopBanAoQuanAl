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
import { useTranslations } from "next-intl";

const Banner = () => {
  const router = useRouter();

  const handleShopNow = () => {
    router.push("/product");
  };
  const t = useTranslations("fashion");
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
            <div className="flex items-center px-6 py-10 bg-gradient-to-r from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 w-1/3">
              <div className="max-w-lg transform transition-all duration-700 hover:translate-y-2">
                <h2 className="text-lg md:text-xl font-medium text-red-600 mb-2">
                  {t("modern_style")}
                </h2>
                <h1 className="prata-regular text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  {t("title")}
                  <span className="text-red-600 underline decoration-2 underline-offset-4">
                    {t("season")}
                  </span>
                </h1>
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-200 leading-relaxed mb-6">
                  {t("description")}
                </p>
                <Button
                  onClick={handleShopNow}
                  className="group bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full flex items-center gap-2"
                >
                  {t("shop_now")}

                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </div>
            </div>
            <div className="relative h-full  bg-gray-50 dark:bg-gray-800 overflow-hidden w-2/3 ">
              <Image
                src="/Image/banner-thoi-trang.jpg"
                alt="Thời trang hiện đại OdinClubs"
                width={800}
                height={600}
                className="w-full h-full  object-cover transition-transform duration-700 hover:scale-105 "
              />
              <div className="absolute bottom-4 right-4 bg-red-600/90 text-white px-4 py-2 rounded-lg text-sm font-medium">
                {t("latest")}
              </div>
            </div>
          </div>
        </SwiperSlide>
        {/* Banner 2 - Xu hướng mùa */}
        <SwiperSlide>
          <div className="flex h-full">
            <div className="flex items-center px-6 py-10 bg-gradient-to-r from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 w-1/3">
              <div className="max-w-lg transform transition-all duration-700 hover:translate-y-2">
                <h2 className="text-lg md:text-xl font-medium text-blue-600 mb-2">
                  {t("trend_title")}
                </h2>
                <h1 className="prata-regular text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  {t("trend_heading")}
                  <span className="text-blue-600 underline decoration-2 underline-offset-4">
                    {t("style")}
                  </span>{" "}
                </h1>
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-200 leading-relaxed mb-6">
                  {t("trend_description")}
                </p>
                <Button
                  onClick={handleShopNow}
                  className="group bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full flex items-center gap-2"
                >
                  {t("discover_now")}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </div>
            </div>
            <div className="relative h-full bg-gray-50 dark:bg-gray-800 overflow-hidden w-2/3">
              <Image
                src="/Image/banner1.png"
                alt="Xu hướng thời trang OdinClubs"
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 "
              />
              <div className="absolute bottom-4 right-4 bg-blue-600/90 text-white px-4 py-2 rounded-lg text-sm font-medium">
                {t("bestseller")}
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Banner 3 - Phong cách thiết kế */}
        <SwiperSlide>
          <div className="flex h-full">
            <div className="flex items-center px-6 py-10 bg-gradient-to-r from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 w-1/3">
              <div className="max-w-lg transform transition-all duration-700 hover:translate-y-2">
                <h2 className="text-lg md:text-xl font-medium text-green-600 mb-2">
                  {t("design_title")}
                </h2>
                <h1 className="prata-regular text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  {t("design_heading")}
                  <span className="text-green-600 underline decoration-2 underline-offset-4">
                    {t("design_highlight")}
                  </span>{" "}
                </h1>
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-200 leading-relaxed mb-6">
                  {t("design_description")}
                </p>
                <Button
                  onClick={handleShopNow}
                  className="group bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full flex items-center gap-2"
                >
                  {t("learn_more")}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </div>
            </div>
            <div className="relative h-full  bg-gray-50 dark:bg-gray-800 overflow-hidden w-2/3">
              <Image
                src="/Image/banner2.png"
                alt="Thiết kế độc đáo OdinClubs"
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 "
              />
              <div className="absolute bottom-4 right-4 bg-green-600/90 text-white px-4 py-2 rounded-lg text-sm font-medium">
                {t("limited")}
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
