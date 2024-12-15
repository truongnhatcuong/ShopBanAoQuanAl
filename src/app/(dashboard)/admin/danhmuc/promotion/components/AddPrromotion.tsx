"use client";
import { FiPlus } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Modal from "react-modal";
import Title from "@/app/(client)/components/Title";
interface IProduct {
  product_id: number;
  product_name: string;
}

const AddPrromotion = (props: { reloadData: () => void }) => {
  const [discount, setDiscount] = useState<number | string>("");
  const [start_date, setStart_date] = useState<string>("");
  const [end_date, setEnd_date] = useState<string>("");
  const [product_id, setProduct_id] = useState<number | null>(null);
  const [product, setProduct] = useState<IProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const MySwal = withReactContent(Swal);
  useEffect(() => {
    async function ApiProduct() {
      const res = await fetch("/api/product");
      const data = await res.json();
      setProduct(data.product);
    }
    ApiProduct();
  }, []);
  const startDate = new Date(start_date); // Chuyển đổi thành đối tượng Date
  const endDate = new Date(end_date); // Chuyển đổi thành đối tượng Date
  async function HandleAddpromiton(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/promotion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          discount,
          start_date: startDate,
          end_date: endDate,
          product_id,
        }),
      });
      if (res.ok) {
        await res.json();
        setIsOpen(false);
        props.reloadData();
        MySwal.fire({
          title: "Thông báo!",
          text: "Thêm khuyến mãi Thành Công",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        const error = await res.json();

        MySwal.fire({
          title: "Thông báo!",
          text: error.message || "bạn không có quyền truy cập",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error: any) {
      MySwal.fire({
        title: "Thông báo!",
        text: error.message || "thất bại",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }

  return (
    <div>
      <div className="flex justify-end mb-5 mr-6">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 px-2 py-1  font-bold text-white hover:bg-blue-700 flex items-center"
        >
          <FiPlus /> <span>Thêm mới</span>
        </button>
      </div>
      {isOpen && (
        <Modal
          isOpen={true}
          ariaHideApp={false}
          onRequestClose={() => setIsOpen(false)}
          contentLabel="Thêm Sản Phẩm"
          className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-3/5 overflow-y-auto max-h-screen"
          overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-70"
        >
          <div className="text-2xl text-center mb-2">
            <Title title1="Thêm Mới" title2="Khuyến Mãi" />
          </div>
          <form onSubmit={HandleAddpromiton} className="mt-4">
            {/* giá trị khuyến mãi và chọn sản phẩm */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6  ">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Nhập giá trị khuyến mãi (%) :
                </label>
                <input
                  type="text"
                  placeholder="nhập 10 , 20 , ... %"
                  className="p-2 border border-gray-500 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-500"
                  value={Number(discount)}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                />
              </div>
              <div className="">
                <label className="block text-sm font-semibold mb-2">
                  Sản Phẩm muốn giảm giá :
                </label>
                <select
                  value={product_id || ""}
                  onChange={(e) => setProduct_id(Number(e.target.value))}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  required
                >
                  <option value={""} disabled>
                    Chọn sản phẩm
                  </option>
                  {product.map((item) => (
                    <option value={item.product_id} key={item.product_id}>
                      {item.product_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* ngày bắt đầu và ngày kết thúc */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Ngày Bắt Đầu :
                </label>
                <input
                  type="date"
                  className="p-7 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                  value={start_date}
                  onChange={(e) => setStart_date(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Ngày kết thúc :
                </label>
                <input
                  type="date"
                  className="p-7  w-full border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                  value={end_date}
                  onChange={(e) => setEnd_date(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                className="bg-red-500 text-white py-2 px-10 rounded-md ml-2 hover:bg-red-700"
                onClick={() => setIsOpen(false)}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-10 rounded-md hover:bg-blue-700"
              >
                Lưu
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AddPrromotion;
