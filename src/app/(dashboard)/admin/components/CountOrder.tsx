import Image from "next/image";
import React, { useEffect, useState } from "react";

const CountOrder = ({ title }: { title: string }) => {
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
    <div className="md:w-1/4 w-full mb-2 md:mr-0  p-6 border-r-4 border-gray-200 shadow-full rounded-xl bg-yellow-400/15 ">
      <div className="flex justify-around items-center">
        <Image
          src={"/image/giohang.png"}
          width={50}
          height={50}
          alt=""
          className=" w-9 h-8 object-contain "
        />
        <h1 className="text-xl text-center uppercase  family">{title}</h1>
      </div>
      <p className=" text-black text-xl text-center mt-4 border-b-4 border-red-500">
        đơn hàng : {order || 0}
      </p>
    </div>
  );
};

export default CountOrder;
