import React, { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
interface ISupplier {
  supplier_id: number;
  supplier_name: string;
  contact_info: string;
}

interface IUpdateSupplier {
  supplier: ISupplier;
  closeHandle: () => void;
  reloadData: () => void;
}
const UpdateSuplier = ({
  supplier,
  closeHandle,
  reloadData,
}: IUpdateSupplier) => {
  const [supplier_name, setSupplier_name] = useState<string>(
    supplier.supplier_name
  );
  const [contact_info, setContact_info] = useState<string>(
    supplier.contact_info
  );
  const [modalIsOpen, setmodalIsOpen] = useState<boolean>(true);

  // xử lý update
  async function UpdateHandler(e: React.FormEvent) {
    e.preventDefault();
    const req = await fetch(`/api/supplier/${supplier.supplier_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ supplier_name, contact_info }),
    });
    if (req.ok) {
      const data = await req.json();
      console.log(data);
      setSupplier_name("");
      setContact_info("");
      closeHandle();

      setmodalIsOpen(() => false);
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Thông báo!",
        text: "Updated Thành Công",
        icon: "success",
        confirmButtonText: "OK",
      });
      reloadData();
    } else {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Thông báo!",
        text: "lỗi khi updated ",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }
  return (
    <div>
      <Modal
        isOpen={true}
        ariaHideApp={false}
        onRequestClose={closeHandle}
        contentLabel="Thêm Thương Hiệu"
        className="fixed  top-[50%] left-[58%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-3/5"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-70"
      >
        <h2 className="text-xl font-bold">Thay Đổi Thông Tin</h2>
        <form className="mt-4" onSubmit={UpdateHandler}>
          <div className="mb-4">
            <label className="block text-gray-700">Tên Nhà Cung Cấp</label>
            <input
              type="text"
              placeholder=" Nhập Tên Nhà Cung Cấp ..."
              value={supplier_name}
              onChange={(e) => setSupplier_name(e.target.value)}
              className="p-2 rounded-lg border-solid border-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Liên Hệ</label>
            <input
              type="number"
              value={contact_info}
              placeholder="Nhập Số Điện Thoại ..."
              onChange={(e) => setContact_info(e.target.value)}
              className="p-2 rounded-lg border-solid border-2 w-full"
              required
            />
          </div>
          <div className="flex justify-end space-x-5">
            {" "}
            <button
              type="button"
              className="bg-red-500 text-white py-2 px-7 rounded-md  hover:bg-red-700"
              onClick={closeHandle}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-7 rounded-md hover:bg-blue-800"
            >
              sửa
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UpdateSuplier;
