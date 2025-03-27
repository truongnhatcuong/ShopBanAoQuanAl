/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { Sparkles, ShoppingCart, CircleAlert, ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ProductImage {
  image_id: number;
  product_id: number;
  image_url: string;
  created_at: string;
  updated_at: string;
}

interface Product {
  product_id: number;
  product_name: string;
  description: string;
  price: string;
  stock_quantity: number;
  Images: ProductImage[];
  score: number;
}

const ProductRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/recommend", {
          next: { revalidate: 50 },
        });
        const data = await res.json();
        setRecommendations(data.data);
      } catch (error) {
        console.error("Lỗi khi lấy gợi ý:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            Gợi ý cho bạn
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Dựa trên sở thích và lịch sử mua sắm của khách hàng
          </p>
        </div>
        <div className="flex items-center">
          <Sparkles className="h-5 w-5 text-yellow-500 mr-2" />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Được cá nhân hóa
          </span>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Đang tìm kiếm sản phẩm phù hợp cho bạn...
          </p>
        </div>
      ) : recommendations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {recommendations.map((product) => (
            <Link
              href={`/product/${product.product_id}`}
              key={product.product_id}
              className="block h-full"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full">
                {/* Image container with fixed height */}
                <div className="relative h-52  dark:bg-gray-700 overflow-hidden group">
                  {product.Images && product.Images.length > 0 ? (
                    <img
                      src={product.Images[0].image_url}
                      alt={product.product_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-gray-400">Chưa có ảnh</span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium px-3 py-1">
                      {Math.round(product.score * 100)}% phù hợp
                    </Badge>
                  </div>
                  {product.stock_quantity < 10 && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-red-500 text-white font-medium px-3 py-1 flex items-center">
                        <CircleAlert className="w-3 h-3 mr-1" />
                        Sắp hết hàng
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content with equal spacing */}
                <div className="p-4 flex-grow flex flex-col">
                  <div className="mb-2">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-1">
                      {product.product_name}
                    </h3>
                    <p className="text-base font-bold text-red-600 dark:text-red-400">
                      {parseInt(product.price).toLocaleString()} ₫
                    </p>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2 flex-grow">
                    {product.description}
                  </p>

                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Còn {product.stock_quantity} sản phẩm
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Độ phù hợp
                        </span>
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                          {(product.score * 100).toFixed(0)}%
                        </span>
                      </div>
                      <Progress value={product.score * 100} className="h-1.5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
          <ThumbsUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Chưa có gợi ý nào
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Hãy duyệt thêm sản phẩm để chúng tôi có thể gợi ý tốt hơn cho bạn.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductRecommendations;
