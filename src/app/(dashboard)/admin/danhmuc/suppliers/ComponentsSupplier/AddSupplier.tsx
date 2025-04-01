"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface IProduct {
  product_id: number;
  product_name: string;
}
const AddSupplier = (props: { closeHandle: any; reloadData: () => void }) => {
  const [supplier_name, setSupplier_name] = useState<string>("");
  const [contact_info, setContact_info] = useState<number | string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number | string>("");
  const [supply_date, setSupply_date] = useState<string>("");
  const [product, setProduct] = useState<IProduct[]>([]);
  const [product_id, setProduct_id] = useState<number | null>(null);
  //gọi lấy id sản phẩm
  useEffect(() => {
    async function ApiProduct() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product`);
      const data = await res.json();
      setProduct(data.product);
    }
    ApiProduct();
  }, []);

  async function AddSupplierHandle(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/supplier`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            supplier_name,
            contact_info,
            product_id,
            quantity,
            supply_date,
          }),
        }
      );
      if (req.ok) {
        const data = await req.json();
        console.log(data);

        setLoading(false);
        props.closeHandle();
        const MySwal = withReactContent(Swal);
        MySwal.fire({
          title: "Thông báo!",
          text: "Thêm supplier Thành Công",
          icon: "success",
          confirmButtonText: "OK",
        });
        props.reloadData();
      } else {
        const MySwal = withReactContent(Swal);
        const error = await req.json();
        console.log(error);

        MySwal.fire({
          title: "Thông báo!",
          text: error.message || "có lỗi",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <div>
      <Modal
        isOpen={true}
        ariaHideApp={false}
        onRequestClose={props.closeHandle}
        contentLabel="Thêm Thương Hiệu"
        className="fixed  top-[50%] left-[58%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-3/5 "
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-70"
      >
        <h2 className="text-xl font-bold">Thêm Nhà Cung Cấp Mới</h2>
        <form className="mt-4" onSubmit={AddSupplierHandle}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-3">Nhà Cung cấp</label>
            <input
              type="text"
              placeholder=" Nhập Tên Nhà Cung Cấp..."
              value={supplier_name}
              onChange={(e) => setSupplier_name(e.target.value)}
              className="p-2 rounded-lg border-solid border-2 w-full"
              required
            />
          </div>
          <div className="mb-4 flex justify-between gap-6">
            <div className="w-1/4 mt-2">
              <label className="block text-sm font-semibold">
                Sản Phẩm
                <select
                  value={product_id || ""}
                  onChange={(e) => setProduct_id(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md p-2 "
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
              </label>
            </div>
            <div className="w-1/4">
              <label className="block text-gray-700">Liên Hệ</label>
              <input
                type="number" // Changed to "number"
                value={contact_info}
                placeholder="Nhập Số Điện Thoại ..."
                onChange={(e) => setContact_info(e.target.value)}
                className="p-2 rounded-lg border-solid border-2 w-full"
                required
              />
            </div>
            <div className="w-1/4">
              <label className="block text-gray-700">Số Lượng</label>
              <input
                type="number" // Changed to "number"
                value={quantity}
                placeholder="số lượng cung cấp"
                onChange={(e) => setQuantity(e.target.value)}
                className="p-2 rounded-lg border-solid border-2 w-full"
                required
              />
            </div>
          </div>
          <div className="mt-8 flex justify-center ">
            <input
              type="date"
              className="w-full max-w-sm px-16 py-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="Thêm ngày cung cấp"
              value={supply_date}
              onChange={(e) => setSupply_date(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              className="bg-red-500 text-white py-2 px-10 rounded-md ml-2 hover:bg-red-700"
              onClick={props.closeHandle}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-10 rounded-md hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "đang lưu..." : "lưu"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddSupplier;
