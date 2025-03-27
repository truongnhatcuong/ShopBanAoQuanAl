"use client";
/* eslint-disable @next/next/no-img-element */
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { CreditCard, ShoppingCart, Check } from "lucide-react";
import { trackUserAction } from "@/lib/trackUserAction";

const stripePromise = loadStripe(
  "pk_test_51QgFtjLc5Tk8M9gL1NtizufQ65Em2RuzO6y6WnpE5apKamJrjxzUPxcCacg50ED79d2RcUetyih82PNO2apQkNSC00Ws1K0EQp"
);

interface CartItem {
  cartitem_id: number;
  product_id: number;
  quantity: number;
  selectedSize: string;
  product: {
    product_name: string;
    price: string;
    Images: { image_url: string }[];
  };
}

interface CartData {
  cart_id: number;
  items: CartItem[];
  customer: string;
  idOrderNext: number;
}

const PaymentPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cart, setCart] = useState<CartData | null>(null);
  const [userId, setUserId] = useState(0);
  const [paymentIntentClientSecret, setPaymentIntentClientSecret] = useState<
    string | null
  >(null);

  useEffect(() => {
    const storedUserId = window.localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(Number(storedUserId));
    }
  }, []);

  useEffect(() => {
    const cartData = searchParams.get("cart");
    const clientSecret = searchParams.get("paymentIntentClientSecret");

    if (cartData) {
      setCart(JSON.parse(decodeURIComponent(cartData)));
    }
    if (clientSecret) {
      setPaymentIntentClientSecret(decodeURIComponent(clientSecret));
    } else {
      toast.error("Không tìm thấy thông tin thanh toán");
      router.push("/");
    }
  }, [searchParams, router]);

  const handlePayment = async () => {
    if (!stripe || !elements || !paymentIntentClientSecret || !cart) {
      toast.error("Thông tin thanh toán không đầy đủ");
      return;
    }

    setIsProcessing(true);
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      toast.error("Không tìm thấy thông tin thẻ");
      setIsProcessing(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      paymentIntentClientSecret,
      {
        payment_method: { card: cardElement },
      }
    );

    if (error) {
      console.error("Stripe error:", error);
      toast.error(error.message || "Thanh toán thất bại");
      setIsProcessing(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      toast.success("Thanh toán thành công! Đơn hàng đã được đặt.");

      await Promise.all(
        cart.items.map((item) =>
          trackUserAction(userId, item.product_id, "purchase")
        )
      );
      router.push("/profile/listorder");
    } else {
      toast.error("Thanh toán không hoàn tất");
    }

    setIsProcessing(false);
  };

  if (!cart || !paymentIntentClientSecret) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin thanh toán...</p>
        </div>
      </div>
    );
  }

  const calculateTotal = () => {
    return cart.items
      .reduce(
        (total, item) => total + parseFloat(item.product.price) * item.quantity,
        0
      )
      .toLocaleString("vi-VN");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-8 bg-blue-50 border-b border-gray-200">
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
              <ShoppingCart className="mr-4 text-blue-600" size={36} />
              Xác Nhận Thanh Toán
            </h1>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              {/* Cart Items Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <CreditCard className="mr-3 text-blue-600" size={24} />
                  Chi Tiết Đơn Hàng
                </h2>
                {cart.items.map((item) => (
                  <div
                    key={item.cartitem_id}
                    className="flex items-center border-b last:border-b-0 py-4 hover:bg-gray-100 transition-colors"
                  >
                    <img
                      src={
                        item.product.Images[0]?.image_url ||
                        "/default-image.jpg"
                      }
                      alt={item.product.product_name}
                      className="w-20 h-20 object-cover rounded-md mr-6 shadow-sm"
                    />
                    <div className="flex-grow">
                      <p className="font-bold text-gray-800">
                        {item.product.product_name}
                      </p>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Số lượng: {item.quantity}</p>
                        <p>Kích thước: {item.selectedSize}</p>
                        <p>
                          Giá:{" "}
                          {parseFloat(item.product.price).toLocaleString(
                            "vi-VN"
                          )}{" "}
                          VND
                        </p>
                      </div>
                    </div>
                    <div className="font-semibold text-blue-600">
                      {(
                        parseFloat(item.product.price) * item.quantity
                      ).toLocaleString("vi-VN")}{" "}
                      VND
                    </div>
                  </div>
                ))}
                <div className="mt-4 text-right font-bold text-xl text-blue-700">
                  Tổng cộng: {calculateTotal()} VND
                </div>
              </div>

              {/* Payment Method Section */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <CreditCard className="mr-3 text-blue-600" size={24} />
                  Thông Tin Thanh Toán
                </h2>
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": { color: "#aab7c4" },
                      },
                      invalid: { color: "#9e2146" },
                    },
                    classes: {
                      base: "p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none",
                    },
                  }}
                />
                <button
                  onClick={handlePayment}
                  className="w-full mt-6 py-3 px-4 
                    bg-blue-600 text-white 
                    rounded-lg 
                    hover:bg-blue-700 
                    transition-colors 
                    flex items-center justify-center
                    disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isProcessing || !stripe || !elements}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin mr-2 h-5 w-5 border-t-2 border-white rounded-full"></div>
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2" size={20} />
                      Xác Nhận Thanh Toán
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentPage = () => (
  <Elements stripe={stripePromise}>
    <PaymentPageContent />
  </Elements>
);

export default PaymentPage;
