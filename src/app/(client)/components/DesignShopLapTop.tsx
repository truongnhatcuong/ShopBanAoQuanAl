import Image from "next/image";
import React from "react";
import Title from "./Title";

const DesignShopLapTop = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto py-24 px-4 sm:px-6 lg:px-8 relative">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 -mt-10 mr-10 w-64 h-64 bg-blue-50 dark:bg-blue-900/20 rounded-full filter blur-3xl opacity-50 z-0"></div>
        <div className="absolute bottom-0 left-0 -mb-10 ml-10 w-64 h-64 bg-pink-50 dark:bg-pink-900/20 rounded-full filter blur-3xl opacity-50 z-0"></div>

        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left side - Content */}
          <div
            className="md:pr-12 flex flex-col justify-center order-1"
            data-aos="fade-right"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="1000"
            data-aos-mirror="true"
          >
            <div className="relative mb-8 inline-block">
              <div className="text-6xl font-bold tracking-tight mb-2">
                <Title title1="Ordin" title2="CLubs" />
              </div>
              <div className="absolute -bottom-3 left-0 h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              Cảm ơn bạn đã quan tâm đến shop áo quần của chúng tôi! Chúng tôi
              luôn mong muốn mang đến cho bạn những sản phẩm chất lượng và phong
              cách nhất.
            </p>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-10">
              Với thiết kế độc đáo và chất liệu cao cấp, Ordin CLubs sẽ giúp bạn
              tự tin và nổi bật trong mọi hoàn cảnh.
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              <button className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Khám phá ngay
              </button>
              <button className="px-8 py-3 border-2 border-black dark:border-white text-black dark:text-white rounded-full font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                Về chúng tôi
              </button>
            </div>
          </div>

          {/* Right side - Image */}
          <div
            className="order-2 relative"
            data-aos="fade-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="1000"
            data-aos-mirror="true"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl blur-xl opacity-70 -z-10"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              <Image
                src="/Image/design.jpg"
                alt="Ordin CLubs Fashion"
                width={600}
                height={600}
                className="w-full h-auto object-cover rounded-2xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6">
                  <h3 className="text-white text-xl font-bold">
                    Bộ sưu tập mới nhất
                  </h3>
                  <p className="text-gray-200 text-sm mt-2">
                    Khám phá xu hướng thời trang 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 text-center">
          <div className="p-4">
            <p className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
              2k+
            </p>
            <p className="text-gray-600 dark:text-gray-400">Khách hàng</p>
          </div>
          <div className="p-4">
            <p className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
              150+
            </p>
            <p className="text-gray-600 dark:text-gray-400">Sản phẩm</p>
          </div>
          <div className="p-4">
            <p className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
              15+
            </p>
            <p className="text-gray-600 dark:text-gray-400">Thương hiệu</p>
          </div>
          <div className="p-4">
            <p className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
              24/7
            </p>
            <p className="text-gray-600 dark:text-gray-400">Hỗ trợ</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignShopLapTop;
