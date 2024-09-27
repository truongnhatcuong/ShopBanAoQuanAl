"use client";
import AddImage from "@/app/components/componentsImageProduct/AddImage";
import TableImage from "@/app/components/componentsImageProduct/TableImage";
import UpdateImage from "@/app/components/componentsImageProduct/UpdateImage";
import React, { useEffect, useState } from "react";

interface IImage {
  image_id: number;
  product_id: number;
  image_url: string;
}

const Image = () => {
  const [image, setImage] = useState<IImage[]>([]);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showUpdate, setshowUpdate] = useState<boolean>(false);
  const [selectImage, setSelectImage] = useState<IImage | null>(null);
  async function ApiImage() {
    const res = await fetch("/api/Image");
    const data = await res.json();
    setImage(data.images);
  }
  useEffect(() => {
    ApiImage();
  }, []);

  const closeIsOpen = (image: IImage) => {
    setSelectImage(image);
    setshowUpdate(true);
  };
  return (
    <div>
      <div className="flex justify-end mr-8">
        <button
          className="px-1.5 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md font-bold"
          onClick={() => setShowAdd(true)}
        >
          Add Image
        </button>
        {showAdd && (
          <AddImage
            closeHandle={() => setShowAdd(false)}
            reloadData={ApiImage}
          />
        )}
      </div>
      <div>
        <TableImage image={image || []} closeHandle={closeIsOpen} />
      </div>
      {showUpdate && selectImage && (
        <UpdateImage
          closeHandle={() => setshowUpdate(false)}
          image={selectImage}
          reloadData={ApiImage}
        />
      )}
    </div>
  );
};

export default Image;
