import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import Modal from "react-modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const Addseason = (props: { reloadData: () => void }) => {
  const [season_name, setSeason_name] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const MySwal = withReactContent(Swal);
  async function AddSeasonHanler(e: any) {
    e.preventDefault();
    setLoading(true);
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/season`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ season_name, description }),
    });
    if (req.ok) {
      const data = await req.json();
      console.log(data);
      setSeason_name("");
      setDescription("");

      setLoading(false);

      MySwal.fire({
        title: "Thông báo!",
        text: "Thêm brand Thành Công",
        icon: "success",
        confirmButtonText: "OK",
      });
      props.reloadData();
    }
  }
  return (
    <>
      <button
        className="bg-blue-600 px-2 py-1 mt-4 font-bold text-white hover:bg-blue-700 flex items-center "
        onClick={() => setIsOpen(true)}
      >
        <FiPlus /> <span>Thêm mới</span>
      </button>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          ariaHideApp={false}
          contentLabel="Thêm Thương Hiệu"
          className="fixed  top-[50%] left-[58%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-3/5"
          overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-70"
        >
          <h2 className="text-xl font-bold">Thêm Mùa Mới</h2>
          <form className="mt-4" onSubmit={AddSeasonHanler}>
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
                rows={5}
                onChange={(e) => setDescription(e.target.value)}
                className="p-2 rounded-lg border-solid border-2 w-full"
                required
              />
            </div>
            <div className="flex justify-end space-x-5">
              <button
                type="button"
                className="bg-red-500 text-white py-2 px-8 rounded-md ml-2 hover:bg-red-700"
                onClick={() => setIsOpen(false)}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-8 rounded-md hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "đang lưu ..." : "Lưu"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default Addseason;
