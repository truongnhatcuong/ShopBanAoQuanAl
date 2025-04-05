import React from "react";
import Image from "next/image";

interface ReturnModalProps {
  isOpen: boolean;
  order: any;
  onClose: () => void;
  onSubmit: (productId: number, reason: string) => void;
  selectedProductId: number | null;
  setSelectedProductId: (id: number | null) => void;
  returnReason: string;
  setReturnReason: (reason: string) => void;
}

const ReturnModal = ({
  isOpen,
  order,
  onClose,
  onSubmit,
  selectedProductId,
  setSelectedProductId,
  returnReason,
  setReturnReason,
}: ReturnModalProps) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Yêu cầu hoàn trả</h2>
        <p className="mb-4">Chọn sản phẩm muốn hoàn trả:</p>
        {order.OrderItems.map((item: any) => (
          <div
            key={item.product_id}
            className="flex items-center gap-4 mb-4 border-b pb-2"
          >
            <input
              type="radio"
              name="product"
              value={item.product_id}
              checked={selectedProductId === item.product_id}
              onChange={() => setSelectedProductId(item.product_id)}
            />
            <Image
              width={50}
              height={50}
              src={item.Product.Images[0]?.image_url}
              alt={item.Product.product_name}
              className="w-12 h-12 object-cover"
            />
            <div>
              <p>{item.Product.product_name}</p>
              <p className="text-sm text-gray-600">
                Size: {item.Size.name_size} - x{item.quantity}
              </p>
            </div>
          </div>
        ))}
        <div className="mb-4">
          <label className="block mb-1">Lý do hoàn trả:</label>
          <textarea
            className="w-full border p-2 rounded"
            value={returnReason}
            onChange={(e) => setReturnReason(e.target.value)}
            placeholder="Nhập lý do hoàn trả..."
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="border px-4 py-2 rounded text-sm"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded text-sm"
            onClick={() =>
              selectedProductId && onSubmit(selectedProductId, returnReason)
            }
          >
            Gửi yêu cầu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReturnModal;
