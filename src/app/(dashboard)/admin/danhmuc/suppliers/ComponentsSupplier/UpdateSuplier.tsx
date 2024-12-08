import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface ISupplier {
  supplier_id: number;
  supplier_name: string;
  contact_info: string;
  ProductSuppliers: {
    quantity: number;
    supply_date: string;
    Product: {
      product_id: number;
      product_name: string;
    };
  }[];
}

interface IProduct {
  product_id: number;
  product_name: string;
}

interface IUpdateSupplier {
  supplier: ISupplier;
  reloadData: () => void;
}

const UpdateSupplier = ({ supplier, reloadData }: IUpdateSupplier) => {
  const [supplier_name, setSupplier_name] = useState(supplier.supplier_name);
  const [contact_info, setContact_info] = useState(supplier.contact_info);
  const [quantity, setQuantity] = useState<number | string>(
    supplier.ProductSuppliers[0]?.quantity || ""
  );
  const [supply_date, setSupply_date] = useState<string>(
    supplier.ProductSuppliers[0]?.supply_date || ""
  );
  const [product_id, setProduct_id] = useState<number | null>(
    supplier.ProductSuppliers[0]?.Product.product_id || null
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const UpdateHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/supplier/${supplier.supplier_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          supplier_name,
          contact_info,
          product_id,
          quantity,
          supply_date,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        reloadData();
        setIsOpen(false);
        withReactContent(Swal).fire({
          title: "Thành công!",
          text: "Cập nhật nhà cung cấp thành công",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error: any) {
      withReactContent(Swal).fire({
        title: "Lỗi!",
        text: error.message || "Có lỗi xảy ra",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsOpen(true)}
      >
        Cập nhật
      </button>

      {isOpen && (
        <Modal
          isOpen={true}
          ariaHideApp={false}
          contentLabel="Cập nhật nhà cung cấp"
          className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-3/5"
          overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-70"
        >
          <h2 className="text-xl font-bold">Cập nhật nhà cung cấp</h2>
          <form className="mt-4" onSubmit={UpdateHandler}>
            <div className="mb-4">
              <label className="block text-gray-700">Tên nhà cung cấp</label>
              <input
                type="text"
                value={supplier_name}
                onChange={(e) => setSupplier_name(e.target.value)}
                className="p-2 rounded-lg border-solid border-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Thông tin liên hệ</label>
              <input
                type="text"
                value={contact_info}
                onChange={(e) => setContact_info(e.target.value)}
                className="p-2 rounded-lg border-solid border-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Số lượng</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="p-2 rounded-lg border-solid border-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Ngày cung cấp</label>
              <input
                type="date"
                value={supply_date}
                onChange={(e) => setSupply_date(e.target.value)}
                className="p-2 rounded-lg border-solid border-2 w-full"
              />
            </div>
            <div className="flex justify-end gap-7">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-red-400 focus:outline-none transition duration-150"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none transition duration-150"
              >
                Lưu
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default UpdateSupplier;
