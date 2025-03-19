/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { ForMatPrice } from "@/lib/FormPrice";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import Modal from "react-modal";

interface OrderManage {
  total_amount: string;
  order_state: string;
  Customer: {
    name: string;
    phone: number;
    AddressShipper?: {
      street_address: string;
      country: string;
      province: string;
      ward: string;
    }[];
  } | null;
  OrderItems: {
    orderitem_id: number;
    quantity: number;
    price: number;
    Product: {
      product_name: string;
      Images: {
        id?: number;
        image_url?: string;
      }[];
    };
  }[];
}

interface tailOrderProps {
  orderId: number;
}

const DetailOrder = ({ orderId }: tailOrderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [orderManage, setOrderManage] = useState<OrderManage | null>(null);

  const ApiOrderManage = async () => {
    try {
      const res = await fetch(`/api/order/${orderId}`);
      const data = await res.json();
      setOrderManage(data.OrderManage);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  useEffect(() => {
    ApiOrderManage();
  }, []);

  return (
    <>
      <button
        className="p-2 text-white bg-blue-500 hover:bg-blue-600 rounded text-xl transition-colors duration-200"
        onClick={() => setIsOpen(true)}
      >
        <FaRegEdit />
      </button>

      <Modal
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Order Details"
        className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl shadow-2xl w-4/5 max-w-3xl overflow-y-auto max-h-[90vh]"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Order Details #{orderId}
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
          </div>

          {orderManage ? (
            <div className="space-y-6">
              {/* Customer Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  Customer Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">
                      {orderManage.Customer?.name || "N/A"}
                    </p>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">
                        {orderManage.Customer?.phone}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Shipping Address</p>
                    <div className="font-medium">
                      {orderManage.Customer?.AddressShipper?.map(
                        (item, index) => (
                          <div key={index} className="mt-2">
                            <p>{item.street_address}</p>
                            <p>{item.ward}</p>
                            <p>{item.province}</p>
                            <p>{item.country}</p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  Order Items
                </h3>
                <div className="space-y-4">
                  {orderManage.OrderItems.map((item) => (
                    <div
                      key={item.orderitem_id}
                      className="flex items-center gap-4 border-b pb-2"
                    >
                      <img
                        src={item.Product.Images[0]?.image_url}
                        alt={item.Product.product_name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium">
                          {item.Product.product_name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm text-gray-600">
                          Price: {item.price}
                        </p>
                      </div>
                      <p className="text-base ">
                        <span className="font-semibol"> Subtotal:</span>{" "}
                        <span className="text-lg">
                          {" "}
                          {ForMatPrice(item.price * item.quantity)}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  Order Summary
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    {/* <span className="font-medium">
                      {orderManage.order_date
                        ? new Date(orderManage.order_date).toLocaleDateString()
                        : "N/A"}
                    </span> */}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`font-medium ${
                        orderManage.order_state === "DELIVERED"
                          ? "text-green-600"
                          : orderManage.order_state === "PENDING"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {orderManage.order_state || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Total Amount:</span>
                    <span>{ForMatPrice(Number(orderManage.total_amount))}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading order details...</p>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default DetailOrder;
