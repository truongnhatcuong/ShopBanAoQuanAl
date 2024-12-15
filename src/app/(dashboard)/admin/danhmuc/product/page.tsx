"use client";
import React, { useContext, useEffect, useState } from "react";
import TableProduct from "./components/TableProduct";
import AddProduct from "./components/Addproduct";
import { ShopConText } from "@/app/context/Context";

interface Product {
  product_id: number;
  product_name: string;
  price: number;
  stock_quantity: number;
  color: string;

  description: string; // Thêm thuộc tính này
  category_id: number; // Thêm thuộc tính này
  brand_id: number; // Thêm thuộc tính này
  season_id: number; // Thêm thuộc tính này
  sizes: any[];
  ProductSizes: {
    size_id: number;
    stock_quantity: number;
    Size?: {
      size_id: number;
      name_size: string;
    };
  }[];
  Images: {
    image_id: number;
    image_url: string;
  }[];
}

const PageProduct = () => {
  const ApiImage = async () => {
    const res = await fetch("/api/ImageProduct");
    await res.json();
  };

  const [product, setProduct] = useState<Product[] | []>([]);
  const fetchApiProduct = async () => {
    const res = await fetch("/api/product");
    const data = await res.json();
    await ApiImage();
    setProduct(data.product);
  };

  useEffect(() => {
    fetchApiProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div className="flex justify-end mb-3 mr-7">
        <AddProduct reloadData={fetchApiProduct} />
      </div>
      <TableProduct productData={product} reloadData={fetchApiProduct} />
    </div>
  );
};

export default PageProduct;
