import Image from "next/image";
import React, { useEffect, useState } from "react";

const CountOrder = () => {
  const [order, setOrder] = useState(0);
  async function FetchApiOrder() {
    const res = await fetch(`/api/admin/thongke`);
    const data = await res.json();
    setOrder(data.countOrder);
  }

  useEffect(() => {
    FetchApiOrder();
  }, []);
  return (
    <div className="md:w-1/4 w-full mb-2 md:mr-0 bg-yellow-100 p-6 border-r-4 border-white">
      <h1 className="text-xl text-center uppercase mb-4 family">
        Đơn Đặt Hàng
      </h1>
      <div className="flex justify-around items-center">
        <Image
          src={"/image/giohang.png"}
          width={50}
          height={50}
          alt=""
          className=" w-9 h-8 object-contain "
        />
        <p className="text-xs text-black">đơn hàng : {order || 0}</p>
      </div>
    </div>
  );
};

export default CountOrder;
