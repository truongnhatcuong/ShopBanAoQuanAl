"use client";
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import Modal from "react-modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
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
interface IPops {
  coupon: ICoupon;
  reloadData: () => void;
}
interface FormData {
  coupon_code: string;
  discount_type: "percentage" | "amount" | any; // Restrict to specific string literals
  discount_value: number; // Change to number
  usage_limit: number; // Change to number
  start_date: string; // Change to string for input compatibility
  end_date: string;
  customerIds: number[];
}
const UpdateCoupon = ({ coupon, reloadData }: IPops) => {
  const MySwal = withReactContent(Swal);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    coupon_code: coupon.coupon_code,
    discount_type: coupon.coupon_percentage === "0" ? "amount" : "percentage",
    discount_value:
      coupon.coupon_amount === "0"
        ? Number(coupon.coupon_percentage)
        : Number(coupon.coupon_amount),
    usage_limit: coupon.usage_limit,
    start_date: new Date(coupon.start_date).toISOString().split("T")[0],
    end_date: new Date(coupon.end_date).toISOString().split("T")[0],
    customerIds: coupon.PromotionNotifications.map(
      (item) => item.Notifications.Customer.customer_id
    ),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "discount_value" || name === "usage_limit") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const UpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/coupon/${coupon.coupon_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    if (res.ok) {
      MySwal.fire({
        position: "center",
        icon: "success",
        title: "chỉnh sửa Mã Khuyến Mãi",
        showConfirmButton: false,
        timer: 1500,
      });
      reloadData();
      setIsOpen(false);
    } else {
      const dataError = await res.json();
      setIsOpen(false);
      console.log(dataError);
      MySwal.fire({
        position: "center",
        icon: "error",
        title: dataError.message || "Lỗi Khi chỉnh sửa khuyến mãi",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <button
        className="p-2 text-white bg-blue-500 hover:bg-blue-600 rounded text-xl"
        onClick={() => setIsOpen(true)}
      >
        <FaRegEdit />
      </button>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          ariaHideApp={false}
          onRequestClose={() => setIsOpen(false)}
          contentLabel="Tạo Mã Giảm Giá"
          className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <div className="p-6">
            {/* Header */}
            <div className="border-b pb-4 mb-6 ">
              <h1 className="text-2xl font-bold text-center text-gray-800">
                Edit Mã Giảm Giá
              </h1>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={UpdateSubmit}>
              {/* Coupon Code */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Mã giảm giá{" "}
                  <span className="text-gray-400 text-xs">
                    (vui lòng viết hoa)
                  </span>
                </label>
                <input
                  type="text"
                  name="coupon_code"
                  value={formData.coupon_code}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out "
                  placeholder="Nhập mã giảm giá"
                />
              </div>

              {/* Discount Type */}
              <div className="space-y-2">
                <label className="block text-2xl font-medium text-gray-700 text-center">
                  Loại giảm giá
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="flex flex-col items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="discount_type"
                        value="percentage"
                        checked={formData.discount_type === "percentage"}
                        onChange={handleChange}
                        disabled
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="mt-2 text-sm font-medium text-gray-700">
                        Phần trăm
                      </span>
                    </label>
                  </div>
                  <div className="relative">
                    <label className="flex flex-col items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="discount_type"
                        value="amount"
                        checked={formData.discount_type === "amount"}
                        disabled
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="mt-2 text-sm font-medium text-gray-700">
                        Số tiền cố định
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Usage Limit */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Trị Giá Khuyến Mãi
                  </label>
                  <input
                    type="text"
                    name="discount_value"
                    value={formData.discount_value}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`vui lòng nhập ${
                      formData.discount_type === "percentage" ? "%" : "số tiền"
                    } khuyến mãi`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Số lần sử dụng tối đa
                  </label>
                  <input
                    type="text"
                    name="usage_limit"
                    value={formData.usage_limit ?? ""}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nhập số lần sử dụng tối đa"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Ngày bắt đầu
                  </label>
                  <input
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Ngày kết thúc
                  </label>
                  <input
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Customer IDs */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Danh sách khách hàng
                </label>
                <input
                  type="text"
                  name="customerIds"
                  value={formData.customerIds.join(",")}
                  onChange={(e) => {
                    const ids = e.target.value
                      .split(",")
                      .map((id) => Number(id.trim())) // Convert to number
                      .filter((id) => !isNaN(id)); // Filter out NaN values
                    setFormData((prev) => ({
                      ...prev,
                      customerIds: ids, // Ensure this is an array of numbers
                    }));
                  }}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập ID khách hàng, cách nhau bởi dấu phẩy"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default UpdateCoupon;
