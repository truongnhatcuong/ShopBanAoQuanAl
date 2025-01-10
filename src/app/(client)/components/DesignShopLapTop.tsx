import Image from "next/image";
import React from "react";
import Title from "./Title";

const DesignShopLapTop = () => {
  return (
    <div className="container py-20">
      <div className="grid grid-cols-2 gap-4">
        {/* left */}
        <div className="order-2">
          <Image src={"/Image/design.jpg"} alt="" width={500} height={500} />
        </div>
        {/* right */}
        <div className="ps-24 order-1">
          <div className="text-6xl text-center">
            <Title title1="Ordin" title2="CLubs" />
          </div>
          <div className="my-6">
            Cảm ơn bạn đã quan tâm đến shop áo quần của chúng tôi! Chúng tôi
            luôn mong muốn mang đến cho bạn những sản phẩm chất lượng và phong
            cách nhất. Hãy ghé thăm và trải nghiệm ngay hôm nay!
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignShopLapTop;
