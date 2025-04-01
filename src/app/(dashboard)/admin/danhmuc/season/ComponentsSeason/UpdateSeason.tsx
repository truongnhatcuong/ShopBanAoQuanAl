import React from "react";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import Modal from "react-modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface Iseason {
  season_id: number;
  season_name: string;
  description: string;
}
interface ISeasonProps {
  season: Iseason;
  reloadData: () => void;
}

const UpdateSeason = ({ season, reloadData }: ISeasonProps) => {
  const [season_name, setSeason_name] = useState<string>(season.season_name);
  const [description, setDescription] = useState<string>(season.description);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const MySwal = withReactContent(Swal);
  async function UpdateHandler(e: React.FormEvent) {
    e.preventDefault();
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/season/${season.season_id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ season_name, description }),
      }
    );
    if (req.ok) {
      const data = await req.json();
      setmodalIsOpen(false);

      MySwal.fire({
        title: "Thông báo!",
        text: "Updated Thành Công",
        icon: "success",
        confirmButtonText: "OK",
      });
      reloadData();
    } else {
      MySwal.fire({
        title: "Thông báo!",
        text: "lỗi khi updated brand",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }
  return (
    <>
      <button
        className="p-2 text-white bg-blue-500 hover:bg-blue-600 rounded text-xl"
        onClick={() => setmodalIsOpen(true)}
      >
        <FaRegEdit />
      </button>
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          ariaHideApp={false}
          contentLabel="Thêm Thương Hiệu"
          className="fixed  top-[50%] left-[58%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-3/5"
          overlayClassName="fixed inset-0 bg-var(--bs-gray-500) bg-opacity-var(--bs-gray-500) "
        >
          <h2 className="text-xl font-bold">Thay Đổi Mùa</h2>
          <form className="mt-4" onSubmit={UpdateHandler}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                placeholder=" nhập tên Mùa ..."
                value={season_name}
                onChange={(e) => setSeason_name(e.target.value)}
                className="p-2 rounded-lg border-solid border-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                value={description}
                placeholder=" mô tả Mùa ..."
                onChange={(e) => setDescription(e.target.value)}
                className="p-2 rounded-lg border-solid border-2 w-full"
                rows={10}
                required
              />
            </div>
            <div className="flex justify-end gap-6">
              <button
                type="button"
                className="bg-red-500 text-white py-2 px-5 rounded-md ml-2 hover:bg-red-700"
                onClick={() => setmodalIsOpen(false)}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-800"
              >
                Cập Nhật
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default UpdateSeason;
