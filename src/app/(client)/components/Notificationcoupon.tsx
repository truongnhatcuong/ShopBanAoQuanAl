/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import moment from "moment";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

interface Inotification {
  notification_id: number;
  notification_type: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const Notificationcoupon = () => {
  const [data, setData] = useState<Inotification[]>([]);
  const [count, setCount] = useState<number>(0);
  const pathname = usePathname();
  moment.locale("vi");
  const FetchApi = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/notification`,
      {
        cache: "no-cache",
        next: { revalidate: 100 },
      }
    );
    const data = await res.json();
    setData(data.notification || []);
    setCount(data.countNotification);
  };

  const markNotification = async (notification_id: number) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/notification/${notification_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.ok) {
      FetchApi();
    } else {
      const errorData = await res.json();
    }
  };

  useEffect(() => {
    FetchApi();
  }, [pathname]);

  return (
    <div className="relative cursor-pointer">
      <DropdownMenu>
        {" "}
        <DropdownMenuTrigger className="flex items-center mt-1" asChild>
          <p>
            <FaRegBell className="w-7 h-7" />
          </p>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mt-3">
          <DropdownMenuLabel className="text-center text-xl font-semibold">
            Thông Báo
          </DropdownMenuLabel>

          <DropdownMenuSeparator />
          {data.length > 0 && data ? (
            data.slice(0, 4).map((item) => (
              <React.Fragment key={item.notification_id}>
                <div
                  className={` flex items-center justify-between ${
                    item.is_read === false
                      ? "bg-orange-300/10"
                      : "bg-gray-100 dark:bg-gray-700/20"
                  }`}
                >
                  <div className="w-9/12 relative">
                    <label htmlFor="" className="text-sm font-semibold">
                      {item.notification_type}
                    </label>
                    {item.is_read === false ? (
                      <img
                        src="/Image/newImg.png"
                        alt=""
                        className="w-12 h-6 absolute -top-1 right-2"
                      />
                    ) : (
                      ""
                    )}
                    <div className="text-xs">{item.message}</div>
                    <div
                      className={`${
                        item.is_read === false
                          ? "text-red-500 text-xs"
                          : " text-gray-600 text-xs"
                      } ml-4`}
                    >
                      {moment(item.created_at).fromNow()}
                    </div>
                  </div>
                  <div
                    className=" w-3/12 cursor-pointer"
                    onClick={() => markNotification(item.notification_id)}
                  >
                    {item.is_read === false ? (
                      <FaCheck className="ml-5 text-green-700 text-xl  hover:text-green-500" />
                    ) : (
                      <p className="text-xs text-slate-500 dark:text-white ">
                        đã xem
                      </p>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator className="pt-[1 px] bg-slate-500" />
              </React.Fragment>
            ))
          ) : (
            <DropdownMenuItem>chưa có thông báo nào</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {count > 0 ? (
        <p className="absolute -right-0 top-0 rounded-full bg-black w-4 h-4 px-[4px] flex items-center text-white text-xs text-center shadow-sm">
          {count}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default Notificationcoupon;
