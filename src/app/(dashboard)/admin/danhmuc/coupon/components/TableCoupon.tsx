import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ForMatPrice } from "@/lib/FormPrice";
import React from "react";
import DeleteCoupon from "./DeleteCoupon";
import UpdateCoupon from "./UpdateCoupon";

interface ICoupon {
  coupon_id: number;
  coupon_code: string;
  coupon_percentage: string;
  coupon_amount: string;
  usage_limit: number;
  start_date: string;
  end_date: string;
  PromotionNotifications: {
    Notifications: { Customer: { customer_id: number; name: string } };
  }[];
}

interface Iprop {
  coupon: ICoupon[] | [];
  reloadData: () => void;
}

const TableCoupon = ({ coupon, reloadData }: Iprop) => {
  return (
    <>
      <>
        <Card>
          <CardHeader className="border mb-2">
            <CardTitle className="text-center  text-2xl font-bold">
              Danh Sách Khuyến Mãi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã Giảm Giá</TableHead>
                  <TableHead>Loại Giảm Giá</TableHead>
                  <TableHead>Giá Trị Giảm Giá</TableHead>
                  <TableHead>Giới Hạn Sử Dụng</TableHead>
                  <TableHead>Thời Gian Hiệu Lực</TableHead>
                  <TableHead>Danh Sách Khách Hàng</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coupon.length > 0 ? (
                  coupon.map((item) => (
                    <TableRow key={item.coupon_id}>
                      <TableCell className="uppercase">
                        {item.coupon_code}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.coupon_percentage !== "0" &&
                        item.coupon_percentage
                          ? `${item.coupon_percentage}%`
                          : `${ForMatPrice(Number(item.coupon_amount))} `}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.usage_limit} Lượt
                      </TableCell>
                      <TableCell>
                        {" "}
                        {new Date(item.start_date).toLocaleString("vi-VN")}
                      </TableCell>
                      <TableCell>
                        {new Date(item.end_date).toLocaleString("vi-VN")}
                      </TableCell>
                      <TableCell>
                        {item.PromotionNotifications.map(
                          (notification, index) => (
                            <div key={index} className="ml-5">
                              {notification.Notifications.Customer.name}
                            </div>
                          )
                        )}
                      </TableCell>
                      <TableCell className="flex gap-3">
                        <UpdateCoupon coupon={item} reloadData={reloadData} />
                        <DeleteCoupon
                          coupon_id={item.coupon_id}
                          reloadData={reloadData}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      Không có dữ liệu
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </>
    </>
  );
};

export default TableCoupon;
