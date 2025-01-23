/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Stars } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import Modal from "react-modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface Product {
  product_id: number;
  product_name: string;
  description: string;
  price: string;
  stock_quantity: number;
  color: string;
  Images: { image_url: string }[];
}
interface Review {
  product_id: number;
  hasReviewed: boolean;
}
interface OrderItem {
  product_id: number;
  Product: Product;
  Size: { name_size: string };
}

const RiviewProduct = ({ order_id }: { order_id: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<OrderItem[] | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [commentReview, setCommentReview] = useState<string>("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [hasReviewed, setHasReviewed] = useState(false);
  const MySwal = withReactContent(Swal);

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/order/${order_id}`);
      const data = await response.json();
      setData(data.getOrderId.OrderItems);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  const productId = data?.length ? Number(data[0].Product.product_id) : null;

  useEffect(() => {
    fetchData();
  }, [order_id]);

  const getRatingMessage = (rating: number) => {
    switch (rating) {
      case 5:
        return "Tuyệt vời";
      case 4:
        return "Hài lòng";
      case 3:
        return "Bình thường";
      case 2:
        return "Không hài lòng";
      case 1:
        return "Tệ";
      default:
        return "";
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    imageFiles.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("product_id", productId!.toString());
    formData.append("comment_review", commentReview);
    formData.append("rating", rating.toString());

    try {
      const res = await fetch(`/api/review`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setIsOpen(false);
        MySwal.fire({
          position: "center",
          icon: "success",
          title: "Cảm ơn Bạn đã Đánh Giá",
          showConfirmButton: false,
          timer: 1500,
        });
        setHasReviewed(true);
      } else {
        const dataError = await res.json();
        setIsOpen(false);
        MySwal.fire({
          position: "center",
          icon: "error",
          title: dataError.message || "Lỗi! Không thể gửi đánh giá.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const checkIfReviewed = async () => {
    if (!productId) return;
    try {
      const response = await fetch("/api/review");
      const data = await response.json();
      // Kiểm tra xem người dùng đã đánh giá sản phẩm này chưa
      if (data && data.getAllReview) {
        const reviewed = data.getAllReview.some(
          (review: Review) =>
            review.product_id === productId && review.hasReviewed === true
        );
        setHasReviewed(reviewed);
      }
    } catch (error) {
      console.error("Error fetching review data:", error);
    }
  };
  useEffect(() => {
    if (productId) {
      checkIfReviewed();
    }
  }, [productId]);

  return (
    <>
      {!hasReviewed ? (
        <button
          className="border-red-600 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm mr-2"
          onClick={() => setIsOpen(true)}
        >
          Đánh Giá
        </button>
      ) : (
        <Link href={`/product/${productId}`}>
          <button className="border-red-600 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm mr-2">
            Mua Lại
          </button>
        </Link>
      )}

      {isOpen && (
        <Modal
          isOpen={isOpen}
          ariaHideApp={false}
          onRequestClose={() => setIsOpen(false)}
          contentLabel="Đánh giá sản phẩm"
          className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-3/5 overflow-y-auto max-h-screen"
          overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-70 z-50"
        >
          <div className="mb-4 text-2xl font-semibold">Đánh giá sản phẩm</div>
          <div>
            {data?.map((item, index) => (
              <div
                className="flex gap-4 py-1.5 border-b items-center"
                key={index}
              >
                <img
                  src={item.Product.Images[0]?.image_url}
                  alt="Product"
                  className="w-20 h-20 object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-sm">
                    {item.Product.product_name}
                  </h3>
                  <p className="text-gray-600 dark:text-white">
                    Phân loại hàng: {item.Size.name_size || ""}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex gap-10 mt-4">
              <p>Chất lượng sản phẩm</p>
              <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <input
                    key={star}
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400 transition-all ease-out duration-300"
                    value={star}
                    checked={rating === star}
                    onChange={() => handleRatingChange(star)}
                  />
                ))}
              </div>
              <div className="text-lg text-gray-500">
                {getRatingMessage(rating)}
              </div>
            </div>

            <div className="bg-white w-full max-w-3xl mt-5 rounded-lg">
              <textarea
                className="w-full border p-2 rounded-md resize-none mt-2"
                rows={8}
                value={commentReview}
                onChange={(e) => setCommentReview(e.target.value)}
                placeholder="Chia sẻ những điều bạn thích về sản phẩm này..."
              />

              <div className="w-fit">
                <label
                  htmlFor="imageInput"
                  className="flex items-center gap-2 mt-2 px-3 py-2 border border-gray-300 text-orange-500 rounded hover:bg-gray-100 cursor-pointer"
                >
                  <FaCamera />
                  <p>Thêm Hình ảnh</p>
                </label>
              </div>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                className="hidden"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  setImageFiles(files);
                }}
              />
              <div className="flex mt-2 gap-2">
                {imageFiles.length > 0 &&
                  imageFiles.map((item, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(item)}
                      alt="Uploaded"
                      className="w-20 h-20 object-cover rounded border"
                    />
                  ))}
              </div>

              <div className="flex justify-end gap-5">
                <button
                  className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Trở Lại
                </button>
                <button
                  className="px-4 py-2 text-sm text-white bg-orange-500 rounded hover:bg-orange-600"
                  onClick={handleSubmit}
                >
                  Hoàn Thành
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default RiviewProduct;
