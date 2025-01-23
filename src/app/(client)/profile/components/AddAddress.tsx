"use client";
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { MdOutlineClose } from "react-icons/md";
import Modal from "react-modal";
interface City {
  Id: string;
  Name: string;
  Districts: District[];
}

interface District {
  Id: string;
  Name: string;
  Wards: Ward[];
}

interface Ward {
  Id: string;
  Name: string;
}

const AddAddress = ({ reloadData }: { reloadData: () => void }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");
  const [specificAddress, setSpecificAddress] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [isDefault, setIsDefault] = useState<boolean>(false);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      );
      const data: City[] = await response.json();
      setCities(data);
    };
    fetchData();
  }, []);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = event.target.value;
    setSelectedCity(cityId);
    setSelectedDistrict("");
    setSelectedWard("");
    setWards([]);

    if (cityId) {
      const selectedCity = cities.find((city) => city.Id === cityId);
      if (selectedCity) {
        setDistricts(selectedCity.Districts);
      }
    }
  };

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const districtId = event.target.value;
    setSelectedDistrict(districtId);
    setSelectedWard("");

    if (districtId) {
      const selectedDistrict = districts.find(
        (district) => district.Id === districtId
      );
      if (selectedDistrict) {
        setWards(selectedDistrict.Wards);
      }
    } else {
      setWards([]);
    }
  };

  const handleWardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWard(event.target.value);
  };

  const cityName = cities.find((city) => city.Id === selectedCity)?.Name || "";
  const districtName =
    districts.find((district) => district.Id === selectedDistrict)?.Name || "";
  const wardName = wards.find((ward) => ward.Id === selectedWard)?.Name || "";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (
      !selectedCity ||
      !selectedDistrict ||
      !selectedWard ||
      !specificAddress
    ) {
      alert("Vui lòng điền đủ thông tin!");
      return;
    }
    try {
      const res = await fetch(`/api/addressShiper`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: "Việt Nam",
          province: cityName,
          district: districtName,
          ward: wardName,
          street_address: specificAddress,
          note: note || null,
          is_default: isDefault,
        }),
      });
      if (res.ok) {
        reloadData();
        MySwal.fire({
          position: "center",
          icon: "success",
          title: "thêm địa chỉ thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        setShowAdd(false);
        setSpecificAddress("");
        setSelectedWard("");
        setSelectedDistrict("");
        setSelectedCity("");
        setWards([]);
        setDistricts([]);
      } else {
        const error = await res.json();
        MySwal.fire({
          position: "center",
          icon: "error",
          title: error.message || "lỗi",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            title: "small-title",
          },
        });
        setShowAdd(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="flex items-center bg-red-500 cursor-pointer mb-4 text-white"
        onClick={() => setShowAdd(true)}
      >
        <FaPlus className="ml-1 " />
        <p className="px-3 py-2 w-32">Thêm địa chỉ</p>
      </div>
      {showAdd && (
        <Modal
          isOpen={showAdd}
          onRequestClose={() => setShowAdd(false)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center"
          overlayClassName="fixed inset-0 bg-black/50 z-50 "
          ariaHideApp={false}
        >
          <div className="w-[500px] bg-white rounded-lg p-6">
            <div
              className=" flex justify-end cursor-pointer"
              onClick={() => setShowAdd(false)}
            >
              <MdOutlineClose className="text-2xl hover:text-red-600 " />
            </div>
            <h2 className="text-xl font-medium mb-6">Thêm Địa Chỉ</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Địa chỉ */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Vui Lòng Chọn Địa Chỉ
                </label>
                <div className="flex gap-5">
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={selectedCity}
                    onChange={handleCityChange}
                  >
                    <option value="" className="text-sm">
                      Tỉnh/Thành phố
                    </option>
                    {cities.map((city) => (
                      <option key={city.Id} value={city.Id}>
                        {city.Name}
                      </option>
                    ))}
                  </select>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                  >
                    <option value="" className="text-sm">
                      Quận/Huyện
                    </option>
                    {districts.map((district) => (
                      <option key={district.Id} value={district.Id}>
                        {district.Name}
                      </option>
                    ))}
                  </select>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={selectedWard}
                    onChange={handleWardChange}
                  >
                    <option value="" className="text-sm">
                      Phường/Xã
                    </option>
                    {wards.map((ward) => (
                      <option key={ward.Id} value={ward.Id}>
                        {ward.Name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Địa chỉ cụ thể */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Địa chỉ cụ thể
                </label>
                <input
                  type="text"
                  value={specificAddress}
                  onChange={(e) => setSpecificAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Nhập địa chỉ cụ thể"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-2">
                  Lưu ý
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="...."
                />
              </div>

              {/* checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="default"
                  checked={isDefault}
                  onChange={(e) => setIsDefault(e.target.checked)}
                  className="w-4 h-4 rounded-md border-gray-400 text-blue-500 focus:ring-blue-500"
                />
                <label htmlFor="default" className="text-gray-600 text-sm">
                  Đặt Làm Mặt Định
                </label>
              </div>

              {/* button */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="border border-gray-300 px-4 py-1.5 rounded-md hover:bg-gray-500"
                  onClick={() => setShowAdd(false)}
                >
                  Trở Lại
                </button>
                <button
                  type="submit"
                  className="border border-gray-300 bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600"
                >
                  Hoàn Tất
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AddAddress;
