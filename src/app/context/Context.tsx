"use client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface IContext {
  cart: any;
  setCart: Dispatch<SetStateAction<string>>;
  totalPrice: number;
  handleAddToCart: (
    product_id: number,
    quantity: number,
    size_id: number
  ) => Promise<void>;
  handleDeleteCartItem: (cartItemId: number) => Promise<void>;
  countCart: any;
  handleQuantityCart: () => Promise<void>;
  ApiImage: () => Promise<void>;
  handleUpdateCartItem: (cartItemId: number, quantity: number) => Promise<void>;
}
interface ShopContextProvider {
  children: ReactNode;
}
export const ShopConText = createContext<IContext | undefined>(undefined);
const ShopContextProvider = ({ children }: ShopContextProvider) => {
  const MySwal = withReactContent(Swal);
  const [cart, setCart] = useState<any>({ items: [] });
  const [countCart, setCountCart] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleAddToCart = async (
    product_id: number,
    quantity: number,
    size_id: number
  ) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id,
          quantity,
          size_id,
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
    // đếm số lượng sản phẩm thêm vào giỏ hàng
    const totalQuantity =
      data?.cart?.items?.reduce(
        (total: number, item: any) => total + item.quantity,
        0
      ) || 0;
    setCountCart(totalQuantity);
    // tổng giá trị sản phẩm
    const totalAmount =
      data?.cart?.items?.reduce((total: number, item: any) => {
        return total + parseFloat(item.product.price) * item.quantity;
      }, 0) || 0;

    setTotalPrice(totalAmount);
  };
  const handleDeleteCartItem = async (cartItemId: number) => {
    const res = await fetch(`/api/cart/${cartItemId}`, { method: "DELETE" });
    if (res.ok) {
      const data = await res.json();
      await handleQuantityCart();
    } else {
      const error = await res.json();
      MySwal.fire({
        position: "center",
        icon: "error",
        title: "Lỗi",
        text: error.message || "Không thể thêm vào giỏ hàng.",
      });
    }
  };

  // updateCart
  const handleUpdateCartItem = async (cartItemId: number, quantity: number) => {
    const res = await fetch(`/api/cart/${cartItemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartItemId,
        quantity,
      }),
    });
    if (res.ok) {
      await handleQuantityCart();
    } else {
      const error = await res.json();
      MySwal.fire({
        position: "center",
        icon: "error",
        title: "Lỗi",
        text: error.message || "Không thể update  giỏ hàng.",
      });
    }
  };

  const ApiImage = async () => {
    const res = await fetch("/api/ImageProduct");
    await res.json();
  };

  // khai báo value
  const value = {
    cart,
    setCart,
    handleAddToCart,
    countCart,
    handleQuantityCart,
    ApiImage,
    totalPrice,
    handleDeleteCartItem,
    handleUpdateCartItem,
  };
  return <ShopConText.Provider value={value}>{children}</ShopConText.Provider>;
};

export default ShopContextProvider;
