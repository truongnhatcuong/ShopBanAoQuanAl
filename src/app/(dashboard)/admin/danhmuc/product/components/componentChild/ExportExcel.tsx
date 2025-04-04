import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaFileExcel } from "react-icons/fa";
import { ForMatPrice } from "@/lib/FormPrice";

interface Product {
  product_id: number;
  product_name: string;
  price: number;
  stock_quantity: number;
  color: string;

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
interface Iprops {
  product: Product[];
}

const ExportExcel = ({ product }: Iprops) => {
  const handleExportExcel = async () => {
    const exportData = product.map((item) => ({
      "Mã Sản Phẩm": item.product_id,
      "Tên Sản Phẩm": item.product_name,
      "Giá Tiền": ForMatPrice(item.price),
      "Tổng Số Lượng": item.stock_quantity,
      "Màu Sắc": item.color,
      "Kích Thước": item.ProductSizes.map((size) => size.Size?.name_size).join(
        ", "
      ),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, worksheet, "Products");

    // Định dạng độ rộng cột (tùy chọn)
    worksheet["!cols"] = [
      { wch: 15 }, // Mã Sản Phẩm
      { wch: 30 }, // Tên Sản Phẩm
      { wch: 15 }, // Giá Tiền
      { wch: 15 }, // Tổng Số Lượng
      { wch: 15 }, // Màu Sắc
      { wch: 30 }, // Kích Thước
    ];

    const excelBuffer = XLSX.write(workBook, {
      bookType: "xlsx",
      type: "array",
    });
    saveAs(new Blob([excelBuffer]), "products.xlsx");
  };

  return (
    <div
      className="flex items-center gap-2 px-3 py-2 text-green-600 bg-green-100 rounded-lg cursor-pointer hover:bg-green-200"
      onClick={handleExportExcel}
    >
      <FaFileExcel className="text-xl" />
      <p className="font-medium">Xuất Excel</p>
    </div>
  );
};

export default ExportExcel;
