/* eslint-disable @next/next/no-img-element */
import { assets } from "@/app/assets/frontend_assets/assets";
import React from "react";
import Title from "../components/Title";

const page = () => {
  return (
    <div>
      {/* Phần tiêu đề */}

      <div className="text-2xl text-center pt-8 border-t uppercase my-4">
        <Title title1="phần" title2="giới thiệu" />
      </div>
      <div className="my-10 flex flex-col sm:flex-row gap-16">
        <img
          src={assets.about_img.src}
          alt=""
          className="w-full md:max-w-[450px]"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            OdinClub là một thương hiệu thời trang hàng đầu, cam kết cung cấp
            những sản phẩm thời trang chất lượng cao với thiết kế hiện đại và
            phong cách độc đáo. Chúng tôi tin rằng thời trang không chỉ là trang
            phục, mà là cách để bạn thể hiện cá tính và phong cách riêng của
            mình.
          </p>
          <p>
            {" "}
            Tại OdinClub, chúng tôi không ngừng đổi mới để đáp ứng nhu cầu của
            khách hàng và tạo ra những sản phẩm không chỉ đẹp mà còn chất lượng.
            Chúng tôi hướng tới việc trở thành lựa chọn hàng đầu cho những ai
            yêu thích thời trang và muốn thể hiện phong cách cá nhân của mình.
          </p>
          <b className="text-gray-800 font-medium">OUR Mission</b>
          <p className="lowercase">
            Production technology and breakthrough in street fashion business in
            Vietnam
          </p>
        </div>
      </div>
      <div className="text-4xl py-4">
        <Title title1="Tại Sao" title2="Chọn Chúng Tôi" />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Chất Lượng</b>
          <p>
            Sản phẩm có xuất xứ tại Nga, được công nhận và kiểm duyệt bởi Cục y
            tế. Chỉ cần sử dụng sản phẩm này, bạn sẽ ngăn chặn tình trạng nôn
            nghén, hạ thấp nguy cơ sảy thai hoặc sinh non, tăng cường hệ miễn
            dịch và nâng cao sức đề kháng cho bé. Mặt khác sản phẩm còn giúp cải
            thiện tình trạng rối loạn cảm xúc; giảm thiểu sự nảy sinh vết nám,
            ngăn ngừa sự xuất hiện các vết rạn da cho các bà bầu...
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Chất Lượng</b>
          <p>
            Sản phẩm có xuất xứ tại Nga, được công nhận và kiểm duyệt bởi Cục y
            tế. Chỉ cần sử dụng sản phẩm này, bạn sẽ ngăn chặn tình trạng nôn
            nghén, hạ thấp nguy cơ sảy thai hoặc sinh non, tăng cường hệ miễn
            dịch và nâng cao sức đề kháng cho bé. Mặt khác sản phẩm còn giúp cải
            thiện tình trạng rối loạn cảm xúc; giảm thiểu sự nảy sinh vết nám,
            ngăn ngừa sự xuất hiện các vết rạn da cho các bà bầu...
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
