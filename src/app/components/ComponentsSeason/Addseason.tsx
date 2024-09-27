import { useEffect, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const Addseason = (props: {
  closeHandle: () => void;
  reloadData: () => void;
}) => {
  const [season_name, setSeason_name] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [modalIsOpen, setmodalIsOpen] = useState(true);

  async function AddSeasonHanler(e: any) {
    e.preventDefault();
    const req = await fetch(`/api/season`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ season_name, description }),
    });
    if (req.ok) {
      const data = await req.json();
      console.log(data);
      setSeason_name("");
      setDescription("");
      props.closeHandle();
      setmodalIsOpen(false);

      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Thông báo!",
        text: "Thêm brand Thành Công",
        icon: "success",
        confirmButtonText: "OK",
      });
      props.reloadData();
      // eslint-disable-next-line react-hooks/rules-of-hooks
    }
  }
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={props.closeHandle}
        contentLabel="Thêm Thương Hiệu"
        className="fixed  top-[50%] left-[58%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-3/5"
        overlayClassName="fixed inset-0 bg-var(--bs-gray-500) bg-opacity-var(--bs-gray-500) "
      >
        <h2 className="text-xl font-bold">Thêm Mùa Mới</h2>
        <form className="mt-4" onSubmit={AddSeasonHanler}>
          <div className="mb-4">
            <label className="block text-gray-700">ID</label>
            <input
              type="text"
              value={"ID Sẽ Được Tạo Tự Động"}
              className="p-2 rounded-lg border-solid border-2 w-full bg-gray-100"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Name Season</label>
            <input
              type="text"
              placeholder=" nhập tên mùa ..."
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
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            Thêm
          </button>
          <button
            type="button"
            className="bg-red-500 text-white py-2 px-4 rounded-md ml-2 hover:bg-red-700"
            onClick={props.closeHandle}
          >
            Hủy
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Addseason;
