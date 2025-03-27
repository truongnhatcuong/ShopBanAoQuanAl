"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";

interface Product {
  product_name: string;
}

interface Customer {
  name: string;
  image: string;
}

interface Review {
  review_id: number;
  product_id: number;
  customer_id: number;
  comment_review: string | null;
  image_url: string | null;
  review_date: string;
  seller_response: string | null;
  hasReviewed: boolean;
  rating: number;
  Product: Product;
  Customer: Customer;
}

interface ActiveResponse {
  review_id: number | null;
  response: string;
}

const ReviewManagement = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const ApiRivew = async () => {
    const res = await fetch(`/api/review`);
    const data = await res.json();
    setReviews(data.getAllReview);
  };

  const [activeResponse, setActiveResponse] = useState<ActiveResponse>({
    review_id: null,
    response: "",
  });
  useEffect(() => {
    ApiRivew();
  }, [activeResponse.response]);

  const handleResponse = (review_id: number) => {
    const review = reviews.find((r) => r.review_id === review_id);

    setActiveResponse({
      review_id,
      response: review?.seller_response || "",
    });

    if (review?.seller_response && !review.hasReviewed) {
      alert("Bạn chỉ được phản hồi một lần duy nhất!");
      return;
    }
  };

  const submitResponse = async (review_id: number) => {
    if (activeResponse.response == "" || !activeResponse) {
      return alert("Vui lòng nhập nội dung phản hồi");
    }
    try {
      const response = await fetch(`/api/review/${review_id}`, {
        method: "PUT",
        body: JSON.stringify({
          seller_response: activeResponse.response,
        }),
      });

      setReviews(
        reviews.map((review) =>
          review.review_id === review_id
            ? {
                ...review,
                seller_response: activeResponse.response,
              }
            : review
        )
      );
      setActiveResponse({ review_id: null, response: "" });
    } catch (error) {
      console.error("Error updating response:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Quản lý Đánh giá Sản phẩm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button variant="outline" className="text-sm">
                Tất cả
              </Button>
              <Button variant="outline" className="text-sm">
                Chưa phản hồi
              </Button>
              <Button variant="outline" className="text-sm">
                Đã phản hồi
              </Button>
            </div>

            {reviews.map((review) => (
              <Card key={review.review_id} className="w-full">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <Image
                            src={
                              review.Customer.image || "/Image/anhdaidien.jpg"
                            }
                            alt=""
                            width={100}
                            height={100}
                            className="w-10 h-10 rounded-full  border-[1px]"
                          />
                          <h3 className="font-semibold">
                            {review.Customer.name}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-500">
                          Sản phẩm: {review.Product.product_name}
                        </p>
                        <div className="flex items-center gap-1 my-2">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              className={`w-4 h-4 ${
                                index < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(review.review_date).toLocaleDateString(
                          "vi-VN"
                        )}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <p className="text-gray-600">{review.comment_review}</p>
                      {review.image_url && (
                        <div className="flex gap-4">
                          {review.image_url.split(",").map((url, index) => (
                            <img
                              src={url}
                              alt={url}
                              key={index}
                              className="h-20 w-20 object-cover rounded-md border"
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="border-t pt-4">
                      {review.seller_response ? (
                        <div className="bg-gray-50 p-4 rounded-md">
                          <p className="text-sm font-medium mb-2">
                            Phản hồi của bạn:
                          </p>
                          <p className="text-gray-600">
                            {review.seller_response}
                          </p>
                          {/* <Button
                            variant="outline"
                            className="mt-2"
                            onClick={() => handleResponse(review.review_id)}
                          >
                            Chỉnh sửa phản hồi
                          </Button> */}
                        </div>
                      ) : activeResponse.review_id === review.review_id ? (
                        <div className="space-y-2">
                          <textarea
                            value={activeResponse.response}
                            onChange={(e) =>
                              setActiveResponse({
                                ...activeResponse,
                                response: e.target.value,
                              })
                            }
                            className="w-full p-2 border rounded-md h-24"
                            placeholder="Nhập phản hồi của bạn..."
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={() => submitResponse(review.review_id)}
                            >
                              Gửi phản hồi
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() =>
                                setActiveResponse({
                                  review_id: null,
                                  response: "",
                                })
                              }
                            >
                              Hủy
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() => handleResponse(review.review_id)}
                        >
                          Thêm phản hồi
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewManagement;
