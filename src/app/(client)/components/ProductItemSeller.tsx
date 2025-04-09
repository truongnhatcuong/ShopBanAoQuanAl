/* eslint-disable @next/next/no-img-element */
import { ForMatPrice } from "@/lib/FormPrice";
import Image from "next/image";
import Link from "next/link";

interface IPromotion {
  discount: number;
  products: {
    product_id: number;
    product_name: string;
    current_price: number;
    original_price: number;
    images: { image_url: string }[];
  }[];
}

interface IProps {
  props: IPromotion;
}

const ProductItemSeller = ({ props }: IProps) => {
  const product = props.products[0];
  const hasSecondImage =
    product.images.length > 1 && product.images[1]?.image_url;

  return (
    <div
      title={`Sản phẩm ${product.product_name}`}
      className="group relative flex flex-col h-full rounded-lg transition-all duration-200 hover:shadow-md bg-gray-100 border-2"
    >
      <Link
        href={`/product/${product.product_id}`}
        className="flex h-full flex-col text-gray-800 dark:text-white"
      >
        {/* Product Image Container */}
        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100">
          {/* Discount Badge */}
          <div className="absolute left-0 top-0 z-10 rounded-br-lg bg-red-600 px-2 py-1 text-xs font-bold text-white shadow-sm">
            -{props.discount}%
          </div>

          {/* Primary Image */}
          <Image
            width={300}
            height={300}
            src={
              product.images[0].image_url ||
              "/placeholder.svg?height=300&width=300"
            }
            alt={product.product_name}
            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-0"
            priority={true}
          />

          {/* Secondary Image (shown on hover) */}
          {hasSecondImage && (
            <Image
              width={300}
              height={300}
              src={product.images[1].image_url || "/placeholder.svg"}
              alt={`${product.product_name} - alternate view`}
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
            />
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-1 flex-col p-3">
          <h3 className="mb-2 line-clamp-2 min-h-[2.5rem] text-sm font-medium md:text-base">
            {product.product_name}
          </h3>

          <div className="mt-auto flex items-center flex-wrap gap-2">
            <span className="text-sm font-bold text-black dark:text-white md:text-base">
              {ForMatPrice(Number(product.current_price))}
            </span>

            <span className="text-xs text-red-600 line-through md:text-sm">
              {ForMatPrice(Number(product.original_price))}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductItemSeller;
