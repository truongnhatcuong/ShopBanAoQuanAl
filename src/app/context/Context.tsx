"use client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface IContext {
  cart: string;
  setCart: Dispatch<SetStateAction<string>>;
  handleAddToCart: (product_id: number, quantity: number) => Promise<void>;
  countCart: any;
  handleQuantityCart: () => Promise<void>;
  ApiImage: () => Promise<void>;
}
interface ShopContextProvider {
  children: ReactNode;
}
export const ShopConText = createContext<IContext | undefined>(undefined);
const ShopContextProvider = ({ children }: ShopContextProvider) => {
  const MySwal = withReactContent(Swal);
  const [cart, setCart] = useState<string>("");
  const [countCart, setCountCart] = useState(0);
  const handleAddToCart = async (product_id: number, quantity: number) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id,
          quantity,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        await handleQuantityCart();
        MySwal.fire({
          position: "center",
          icon: "success",
          title: "Đã thêm vào giỏ hàng",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const error = await response.json();
        MySwal.fire({
          position: "center",
          icon: "error",
          title: "Lỗi",
          text: error.message || "Không thể thêm vào giỏ hàng.",
        });
      }
    } catch (error) {
      MySwal.fire({
        position: "center",
        icon: "error",
        title: "Lỗi hệ thống",
        text: "Không thể kết nối tới server.",
      });
    }
  };

  const handleQuantityCart = async () => {
    const res = await fetch("/api/cart");
    const data = await res.json();
    const totalQuantity =
      data?.cart?.items.reduce(
        (total: number, item: any) => total + item.quantity,
        0
      ) || 0;
    setCountCart(totalQuantity);
  };

  const ApiImage = async () => {
    const res = await fetch("/api/ImageProduct");
    const data = await res.json();
  };

  // khai báo value
  const value = {
    cart,
    setCart,
    handleAddToCart,
    countCart,
    handleQuantityCart,
    ApiImage,
  };
  return <ShopConText.Provider value={value}>{children}</ShopConText.Provider>;
};

export default ShopContextProvider;
