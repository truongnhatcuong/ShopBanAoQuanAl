/* eslint-disable @next/next/no-img-element */
import React from "react";

interface IProduct {
  product_id: number;
  product_name: string;
  description: string;
  price: string;
  stock_quantity: number;
  color: string;
  Category: { category_name: string };
  Images: { image_url: string }[];
}

interface IProps {
  productDetail: IProduct | null;
}

const ProductDetail = ({ productDetail }: IProps) => {
  if (!productDetail) {
    return <p>Loading...</p>;
  }
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-6 pb-6 mb-6">
        {/* Hình ảnh sản phẩm */}
        <div className="w-full lg:w-2/3 flex justify-end">
          <img
            src={productDetail.Images[0].image_url} // Lấy hình ảnh đầu tiên trong danh sách
            alt={productDetail.product_name}
            className="w-[650px] h-[600px] object-cover"
          />
        </div>

        {/* Chi tiết sản phẩm */}
        <div className="w-full lg:w-1/3 space-y-4 mt-3 ">
          <h2 className="text-2xl font-semibold text-gray-800 uppercase">
            {productDetail.product_name}
          </h2>
          <p className="text-xs text-gray-700 uppercase mb-1 font-semibold">
            Mã Sản Phẩm: {productDetail.product_id}
          </p>
          <p className="text-xs text-gray-700 uppercase mb-1 font-semibold">
            Danh mục:{" "}
            <span className="font-semibold">
              {productDetail.Category.category_name}
            </span>
          </p>
          <div className="border-y-[1px] border-dotted border-slate-400 py-6">
            <p className="font-medium text-xl">
              <span>
                {parseInt(productDetail.price)
                  .toLocaleString("vi-VN")
                  .replace(/\./g, ",")}
              </span>
              <span className="border-b-2 border-black ">đ</span>
            </p>
          </div>
          <div className="border-b-[1px] border-dotted border-slate-400 py-3 ">
            <p className="text-sm text-gray-700">
              Màu sắc:{" "}
              <span className="font-semibold">{productDetail.color}</span>
            </p>
            <br />
            <p className="text-lg text-gray-700 font-semibold ">
              Tồn kho:{" "}
              <span>
                {productDetail.stock_quantity > 0
                  ? `${productDetail.stock_quantity} sản phẩm`
                  : "Hết hàng"}
              </span>
            </p>
          </div>
          <div className="mt-4 max-w-full overflow-hidden">
            <h3 className="text-lg font-semibold mb-2">Mô Tả Sản Phẩm:</h3>
            <p className="max-h-[400px] overflow-auto text-gray-700">
              {productDetail.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
