/* eslint-disable @next/next/no-img-element */
import React from "react";
import moment from "moment";
import "moment/locale/vi";

export interface Review {
  review_id: number;
  comment_review: string;
  image_url: string;
  review_date: string;
  seller_response: string;
  rating: number;
  Customer: { name: string };
}
interface ReviewProps {
  review: Review;
  countReview: number;
}
const ReViewProduct = ({ review, countReview }: ReviewProps) => {
  moment.locale("vi");

  return (
    <div className="p-6 border rounded-lg shadow-sm bg-white">
      <h1 className="text-xl font-semibold mb-4 text-gray-800">
        Đánh Giá Sản Phẩm <span>({countReview})</span>
      </h1>
      <div className="flex flex-col gap-3">
        {" "}
        <div className="flex items-center gap-4">
          {" "}
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <span>{review.Customer.name.charAt(0).toLocaleUpperCase()}</span>
          </div>
          <div>
            <h3 className="font-medium text-gray-800">
              {review.Customer.name}
            </h3>
            <div className="rating mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <input
                  key={star}
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-red-600 h-4 transition-all ease-out duration-300"
                  value={star}
                  checked={star === review.rating}
                  disabled
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-400">
          {moment(review.review_date).fromNow()}
        </p>
        {/* Comment */}
        <div className="">
          <p className="block text-gray-400">Chất lượng sản phẩm:</p>
          <p className="text-gray-800 mb-1 text-left text-sm">
            {review.comment_review}
          </p>
        </div>
        {/* Image */}
        <div className="flex justify-start">
          {review.image_url && (
            <div className="flex gap-7 justify-start">
              {review.image_url.split(", ").map((item, index) => (
                <img
                  key={index}
                  src={item}
                  alt="Review Image"
                  className="w-20 h-20 object-cover rounded border"
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className=" mt-2 w-96">
        {review.seller_response ? (
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm font-medium mb-2">Phản hồi của bạn:</p>
            <p className="text-gray-600">{review.seller_response}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ReViewProduct;
