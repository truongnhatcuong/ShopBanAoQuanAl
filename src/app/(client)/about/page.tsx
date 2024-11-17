/* eslint-disable @next/next/no-img-element */
import React from "react";

const page = () => {
  return (
    <div>
      <section className="py-12 bg-gray-100 dark:bg-gray-700">
        <div className="container mx-auto px-4">
          {/* Phần tiêu đề */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-black dark:text-gray-100 mb-4">
              Về OdinClub
            </h2>
            <p className="text-lg text-black dark:text-white">
              OdinClub là một thương hiệu thời trang hàng đầu, cam kết cung cấp
              những sản phẩm thời trang chất lượng cao với thiết kế hiện đại và
              phong cách độc đáo. Chúng tôi tin rằng thời trang không chỉ là
              trang phục, mà là cách để bạn thể hiện cá tính và phong cách riêng
              của mình.
            </p>
          </div>

          {/* Phần nội dung */}
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="md:w-1/2 p-4">
              <img
                src="https://gstatic.gvn360.com/2020/05/angel-warrior-wallpaper-hd-1920x1200-352377.jpg"
                alt="Mikenco Store"
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 p-4">
              <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">
                Tầm Nhìn Của Chúng Tôi
              </h3>
              <p className="text-black dark:text-white">
                Tại OdinClub, chúng tôi không ngừng đổi mới để đáp ứng nhu cầu
                của khách hàng và tạo ra những sản phẩm không chỉ đẹp mà còn
                chất lượng. Chúng tôi hướng tới việc trở thành lựa chọn hàng đầu
                cho những ai yêu thích thời trang và muốn thể hiện phong cách cá
                nhân của mình.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
