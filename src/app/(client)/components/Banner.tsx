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
    <div className="my-5 h-auto min-h-[60vh] md:h-[70vh] w-full">
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
        className="mySwiper overflow-hidden rounded-2xl shadow-xl h-full"
      >
        {/* Banner 1 - Modern Style */}
        <SwiperSlide>
          <div className="flex flex-col md:flex-row h-full bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="flex items-center justify-center px-4 py-6 md:px-8 md:py-10 w-full md:w-1/3">
              <div className="max-w-md text-center md:text-left transform transition-all duration-500 hover:-translate-y-1">
                <h2 className="text-sm md:text-lg lg:text-xl font-semibold text-red-600 mb-2 tracking-wide">
                  {t("modern_style")}
                </h2>
                <h1 className="prata-regular text-xl md:text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 leading-tight">
                  {t("title")}
                  <span className="text-red-600 underline decoration-2 underline-offset-4">
                    {t("season")}
                  </span>
                </h1>
                <p className="text-xs md:text-sm lg:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4 md:mb-6 line-clamp-3">
                  {t("description")}
                </p>
                <Button
                  onClick={handleShopNow}
                  className="group bg-red-600 hover:bg-red-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-full flex items-center justify-center gap-2 text-sm md:text-base shadow-md transition-all duration-300"
                >
                  {t("shop_now")}
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Button>
              </div>
            </div>
            <div className="relative w-full md:w-2/3 h-[40vh] sm:h-[50vh] md:h-full overflow-hidden">
              <Image
                src="/Image/banner-thoi-trang.jpg"
                alt="Thời trang hiện đại OdinClubs"
                fill
                className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-red-600/90 text-white px-2 py-1 md:px-3 md:py-1.5 rounded-md text-xs md:text-sm font-medium shadow-sm">
                {t("latest")}
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Banner 2 - Seasonal Trends */}
        <SwiperSlide>
          <div className="flex flex-col md:flex-row h-full bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="flex items-center justify-center px-4 py-6 md:px-8 md:py-10 w-full md:w-1/3">
              <div className="max-w-md text-center md:text-left transform transition-all duration-500 hover:-translate-y-1">
                <h2 className="text-sm md:text-lg lg:text-xl font-semibold text-blue-600 mb-2 tracking-wide">
                  {t("trend_title")}
                </h2>
                <h1 className="prata-regular text-xl md:text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 leading-tight">
                  {t("trend_heading")}
                  <span className="text-blue-600 underline decoration-2 underline-offset-4">
                    {t("style")}
                  </span>
                </h1>
                <p className="text-xs md:text-sm lg:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4 md:mb-6 line-clamp-3">
                  {t("trend_description")}
                </p>
                <Button
                  onClick={handleShopNow}
                  className="group bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-full flex items-center justify-center gap-2 text-sm md:text-base shadow-md transition-all duration-300"
                >
                  {t("discover_now")}
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Button>
              </div>
            </div>
            <div className="relative w-full md:w-2/3 h-[40vh] sm:h-[50vh] md:h-full overflow-hidden">
              <Image
                src="/Image/banner1.png"
                alt="Xu hướng thời trang OdinClubs"
                fill
                className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-blue-600/90 text-white px-2 py-1 md:px-3 md:py-1.5 rounded-md text-xs md:text-sm font-medium shadow-sm">
                {t("bestseller")}
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Banner 3 - Design Style */}
        <SwiperSlide>
          <div className="flex flex-col md:flex-row h-full bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="flex items-center justify-center px-4 py-6 md:px-8 md:py-10 w-full md:w-1/3">
              <div className="max-w-md text-center md:text-left transform transition-all duration-500 hover:-translate-y-1">
                <h2 className="text-sm md:text-lg lg:text-xl font-semibold text-green-600 mb-2 tracking-wide">
                  {t("design_title")}
                </h2>
                <h1 className="prata-regular text-xl md:text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 leading-tight">
                  {t("design_heading")}
                  <span className="text-green-600 underline decoration-2 underline-offset-4">
                    {t("design_highlight")}
                  </span>
                </h1>
                <p className="text-xs md:text-sm lg:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4 md:mb-6 line-clamp-3">
                  {t("design_description")}
                </p>
                <Button
                  onClick={handleShopNow}
                  className="group bg-green-600 hover:bg-green-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-full flex items-center justify-center gap-2 text-sm md:text-base shadow-md transition-all duration-300"
                >
                  {t("learn_more")}
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Button>
              </div>
            </div>
            <div className="relative w-full md:w-2/3 h-[40vh] sm:h-[50vh] md:h-full overflow-hidden">
              <Image
                src="/Image/banner2.png"
                alt="Thiết kế độc đáo OdinClubs"
                fill
                className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-green-600/90 text-white px-2 py-1 md:px-3 md:py-1.5 rounded-md text-xs md:text-sm font-medium shadow-sm">
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
