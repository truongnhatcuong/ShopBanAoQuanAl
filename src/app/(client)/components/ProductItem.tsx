/* eslint-disable @next/next/no-img-element */
import { ForMatPrice } from "@/lib/FormPrice";
import Image from "next/image";
import Link from "next/link";

interface IProduct {
  product_id: number;
  product_name: string;
  price: number;
  Images: { image_url: string | any }[];
  ProductPromotion?: { Promotion: { discount: number } }[];
}

const ProductItem = ({
  product_id,
  Images,
  price,
  product_name,
  ProductPromotion,
}: IProduct) => {
  const hasDiscount =
    ProductPromotion && ProductPromotion[0]?.Promotion.discount > 0;

  return (
    <div
      title={`Sản phẩm ${product_name}`}
      className="group relative flex flex-col h-full rounded-lg transition-all duration-200 hover:shadow-md"
    >
      <Link
        href={`/product/${product_id}`}
        className="flex h-full flex-col text-gray-800 dark:text-white"
      >
        {/* Product Image Container */}
        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100">
          {/* Primary Image */}
          <Image
            width={400}
            height={400}
            src={
              Images[0]?.image_url || "/placeholder.svg?height=400&width=400"
            }
            alt={product_name}
            className="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
            priority={true}
          />

          {/* Secondary Image (shown on hover) */}
          {Images[1] && (
            <Image
              width={400}
              height={400}
              src={Images[1].image_url || "/placeholder.svg"}
              alt={`${product_name} - alternate view`}
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute left-0 top-0 z-10 rounded-br-lg bg-red-600 px-2 py-1 text-xs font-bold text-white shadow-sm">
              -{ProductPromotion[0]?.Promotion.discount}%
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-1 flex-col p-3">
          <h3 className="mb-1 line-clamp-2 min-h-[2.5rem] text-sm font-medium md:text-base">
            {product_name}
          </h3>

          <p className="mt-auto text-sm font-semibold text-black dark:text-white md:text-base">
            {ForMatPrice(Number(price))}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
