/* eslint-disable react-hooks/exhaustive-deps */
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
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";

interface CartItem {
  cartitem_id: number;
  product_id: number;
  quantity: number;
  selectedSize: string; // Thêm thuộc tính selectedSize
  product: {
    product_name: string;
    price: string;
    Images: { image_url: string }[];
  };
  image_url: string;
}

interface IUser {
  name: string;
  phone: number | string;
  username: string;
  image: string;
  roleId: number;
  email: string;
}

interface IContext {
  cart: CartItem[];
  setCart: (value: any) => void;
  totalPrice: number;
  handleAddToCart: (
    product_id: number,
    quantity: number,
    size_id: number
  ) => Promise<void>;
  handleDeleteCartItem: (cartItemId: number) => Promise<void>;
  countCart: any;
  setCountCart: (value: number) => void;
  handleQuantityCart: () => Promise<void>;
  isLeftMenuVisible: boolean;
  setIsLeftMenuVisible: Dispatch<SetStateAction<boolean>>;
  handleUpdateCartItem: (cartItemId: number, quantity: number) => Promise<void>;
  user: any;
  setFinalTotal: (value: number) => void;
  finalTotal: number;
  setUser: (value: any) => void;
}
interface ShopContextProvider {
  children: ReactNode;
}
export const ShopConText = createContext<IContext | undefined>(undefined);
const ShopContextProvider = ({ children }: ShopContextProvider) => {
  const MySwal = withReactContent(Swal);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [countCart, setCountCart] = useState<any>(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLeftMenuVisible, setIsLeftMenuVisible] = useState(true);
  const pathname = usePathname();
  const [user, setUser] = useState<IUser>({
    username: "",
    roleId: 1,
    image: "",
    name: "",
    phone: "",
    email: "",
  });
  const [finalTotal, setFinalTotal] = useState(0) || totalPrice;

  async function fetchUserInfo() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/getUsername`
    );
    const data = await res.json();
    setUser({
      username: data.accessToken?.username,
      roleId: data.accessToken?.roleId,
      image: data.accessToken?.image,
      phone: data.accessToken?.phone,
      name: data.accessToken?.name,
      email: data.accessToken?.email,
    });
  }

  useEffect(() => {
    fetchUserInfo();
    handleQuantityCart();
  }, [pathname]);

  const handleQuantityCart = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
        cache: "no-store",
      });
      const data = await res.json();

      if (res.ok) {
        setCart(data.cart.items ?? []);
        setCountCart(data.cart.totalQuantity ?? 0);
        setTotalPrice(data.cart.totalAmount ?? 0);
      } else {
        console.warn("⚠️ API không trả về cart hợp lệ:", data);
      }
    } catch (error) {
      console.error("❌ Lỗi khi gọi API cart:", error);
    }
  };

  const handleAddToCart = async (
    product_id: number,
    quantity: number,
    size_id: number
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_id,
            quantity,
            size_id,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        await handleQuantityCart();
        MySwal.fire({
          position: "top-end",
          icon: "success",
          title: "🎉 Sản phẩm đã được thêm vào giỏ hàng!",
          showConfirmButton: false,
          timer: 3200,
          toast: true,
          timerProgressBar: true,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      } else {
        MySwal.fire({
          title: "Lỗi",
          text: data.message,
          icon: "error",
          confirmButtonText: "Đăng nhập ngay",
          preConfirm: () => {
            window.location.href = "/login";
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCartItem = async (cartItemId: number) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/cart/${cartItemId}`,
      { method: "DELETE" }
    );
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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/cart/${cartItemId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItemId,
          quantity,
        }),
      }
    );
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

  // khai báo value
  const value = {
    cart,
    setCart,
    handleAddToCart,
    countCart,
    handleQuantityCart,
    totalPrice,
    handleDeleteCartItem,
    handleUpdateCartItem,
    isLeftMenuVisible,
    setIsLeftMenuVisible,
    user,
    finalTotal,
    setFinalTotal,
    setCountCart,
    setUser,
  };
  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      <ShopConText.Provider value={value}>
        <div className="text-black dark:text-white dark:bg-black min-h-screen transition-colors duration-300">
          {children}
        </div>
      </ShopConText.Provider>
    </ThemeProvider>
  );
};

export default ShopContextProvider;
