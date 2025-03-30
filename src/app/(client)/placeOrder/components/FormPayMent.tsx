"use client";
import { ShopConText } from "@/app/context/Context";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import QRCode from "./QrReact";
import { trackUserAction } from "@/lib/trackUserAction";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CreditCard, Banknote, Wallet, CheckCircle, Clock } from "lucide-react";
import { ForMatPrice } from "@/lib/FormPrice";

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

interface OrderResponse {
  order: any;
  paymentIntentClientSecret?: string;
  message: string;
}

const PaymentMethodForm = ({
  customerId,
  addressId,
  cart,
}: {
  customerId: number;
  addressId: number;
  cart: CartData;
}) => {
  const { finalTotal } = useContext(ShopConText)!;
  console.log("endgame", finalTotal);

  const [paymentMethod, setPaymentMethod] = useState<
    "CASH" | "CREDIT_CARD" | "E_WALLET"
  >("CASH");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<{
    clientSecret?: string;
    cart?: CartData;
  }>({});
  const router = useRouter();

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsProcessing(true);

      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId,
          addressId,
          paymentMethod,
          finalTotal,
        }),
      });

      const data: OrderResponse = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Đã xảy ra lỗi khi đặt hàng");
        setIsProcessing(false);
        return;
      }

      if (paymentMethod === "CREDIT_CARD" && data.paymentIntentClientSecret) {
        // Open modal for credit card payment
        setPaymentDetails({
          clientSecret: data.paymentIntentClientSecret,
          cart: cart,
        });
        setIsModalOpen(true);
      } else {
        // Xử lý các phương thức khác (CASH, E_WALLET)
        toast.success("Đã đặt thành công đơn hàng");
        await Promise.all(
          cart.items.map((item) => trackUserAction(item.product_id, "purchase"))
        );
        router.push("/profile/listorder");
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Đã xảy ra lỗi mạng");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCreditCardPayment = () => {
    if (paymentDetails.clientSecret && paymentDetails.cart) {
      router.push(
        `/thanhtoan?paymentIntentClientSecret=${encodeURIComponent(
          paymentDetails.clientSecret
        )}&cart=${encodeURIComponent(JSON.stringify(paymentDetails.cart))}`
      );
    }
  };

  return (
    <>
      <div className="mt-[30px]">
        <form
          onSubmit={handlePaymentSubmit}
          className="bg-white shadow-xl rounded-lg p-6 space-y-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Wallet className="mr-3 text-blue-600" size={24} />
            Phương thức thanh toán
          </h2>

          <div className="space-y-4">
            {/* Payment Method Options */}
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="CASH"
                checked={paymentMethod === "CASH"}
                onChange={() => setPaymentMethod("CASH")}
                className="form-radio text-blue-600"
                disabled={isProcessing}
              />
              <div className="flex items-center space-x-3">
                <Banknote className="text-green-600" size={24} />
                <span className="text-gray-700">Thanh toán khi nhận hàng</span>
              </div>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="CREDIT_CARD"
                checked={paymentMethod === "CREDIT_CARD"}
                onChange={() => setPaymentMethod("CREDIT_CARD")}
                className="form-radio text-blue-600"
                disabled={isProcessing}
              />
              <div className="flex items-center space-x-3">
                <CreditCard className="text-blue-600" size={24} />
                <span className="text-gray-700">Thẻ tín dụng (Stripe)</span>
              </div>
            </label>

            <label
              className="flex items-center space-x-3 cursor-pointer "
              title="Không khả dụng"
            >
              <input
                type="radio"
                name="payment"
                value="E_WALLET"
                checked={paymentMethod === "E_WALLET"}
                onChange={() => setPaymentMethod("E_WALLET")}
                className="form-radio text-blue-600"
                disabled={isProcessing}
              />
              <div className="flex items-center space-x-3">
                <Wallet className="text-red-600" size={24} />
                <span className="text-red-600">Ví điện tử</span>
              </div>
            </label>

            {paymentMethod === "E_WALLET" && <QRCode cart={cart} />}
          </div>

          <hr className="border-t border-gray-200 my-4" />

          <button
            type="submit"
            className="w-full py-3 px-4 
              bg-blue-600 text-white 
              rounded-lg 
              hover:bg-blue-700 
              transition-colors 
              flex items-center justify-center
              disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Clock className="mr-2 animate-spin" size={20} />
                Đang xử lý...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2" size={20} />
                Đặt Hàng
              </>
            )}
          </button>
        </form>
      </div>

      {/* Payment Confirmation Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <CreditCard className="mr-3 text-blue-600" size={24} />
              Xác Nhận Thanh Toán
            </DialogTitle>
            <DialogDescription>
              Bạn đã chọn thanh toán bằng thẻ tín dụng. Nhấn tiếp tục để chuyển
              đến trang thanh toán.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Tổng Số Tiền</h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-xl font-bold text-blue-600">
                {ForMatPrice(finalTotal)}
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Hủy
            </button>
            <button
              onClick={handleCreditCardPayment}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <CheckCircle className="mr-2" size={20} />
              Tiếp Tục
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentMethodForm;
