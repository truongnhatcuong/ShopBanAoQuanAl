"use client";
import React, { useEffect, useState } from "react";
import TableProduct from "./components/TableProduct";
import AddProduct from "./components/Addproduct";

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
  const [product, setProduct] = useState<Product[] | []>([]);

  const fetchApiProduct = async () => {
    const res = await fetch("/api/product");
    const data = await res.json();
    setProduct(data);
  };
  useEffect(() => {
    fetchApiProduct();
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
