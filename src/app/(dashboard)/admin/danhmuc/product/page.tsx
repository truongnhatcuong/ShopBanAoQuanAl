"use client";
import Addproduct from "@/app/components/ComponentsProduct/Addproduct";
import TableProduct from "@/app/components/ComponentsProduct/TableProduct";
import UpdateProduct from "@/app/components/ComponentsProduct/UpdateProduct";
import React, { useEffect, useState } from "react";

interface IProduct {
  product_id: number;
  product_name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category_id: number;
  brand_id: number;
  season_id: number;
  color: string;
}
const Page = () => {
  const [product, setProduct] = useState<IProduct[]>([]);
  const [showadd, setshowadd] = useState(false);
  const [showUpdate, setShowupdate] = useState(false);
  const [selectProduct, setSelectProduct] = useState<IProduct | null>(null);
  async function ApiProduct() {
    const req = await fetch(`/api/product`, { cache: "no-cache" });
    const data = await req.json();
    setProduct(data.Product);
  }
  useEffect(() => {
    ApiProduct();
  }, []);

  const closeHanle = (product: IProduct) => {
    setSelectProduct(product);
    setShowupdate(true);
  };

  return (
    <div>
      <div className="flex justify-end mr-5 mb-6">
        <button
          className="bg-blue-500 px-6 py-3 rounded-md font-bold text-white hover:bg-blue-700"
          onClick={() => setshowadd(true)}
        >
          Thêm Sản Phẩm
        </button>
        {showadd && (
          <Addproduct
            closeHandle={() => setshowadd(false)}
            reloadData={ApiProduct}
          />
        )}
      </div>
      <div>
        <TableProduct product={product} closeHandle={closeHanle} />
      </div>
      {showUpdate && selectProduct && (
        <UpdateProduct
          closeHandle={() => setShowupdate(false)}
          product={selectProduct}
          reloadData={ApiProduct}
        />
      )}
    </div>
  );
};

export default Page;
