"use client";
import { ShopConText } from "@/app/context/Context";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
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

const PaymentMethodForm = ({
  addressId,
  cart,
}: {
  addressId: number;
  cart: CartData;
}) => {
  const { finalTotal } = useContext(ShopConText)!;
  console.log("endgame", finalTotal);

  const [paymentMethod, setPaymentMethod] = useState<
    "CASH" | "CREDIT_CARD" | "E_WALLET" | "BANK_TRANSFER"
  >("CASH");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<{
    clientSecret?: string;
    paymentUrl?: string; // Thêm paymentUrl cho VNPay
    cart?: CartData;
  }>({});
  const router = useRouter();

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsProcessing(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Gửi cookie nếu cần
          body: JSON.stringify({
            addressId,
            paymentMethod,
            finalTotal,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Đã xảy ra lỗi khi đặt hàng");
        setIsProcessing(false);
        return;
      }

      // Xử lý từng phương thức thanh toán
      if (paymentMethod === "CREDIT_CARD" && data.paymentIntentClientSecret) {
        // Thanh toán bằng Stripe
        setPaymentDetails({
          clientSecret: data.paymentIntentClientSecret,
          cart,
        });
        setIsModalOpen(true);
      } else if (paymentMethod === "E_WALLET" && data.links) {
        //
        const approvalUrl = data.links.find(
          (link: any) => link.rel === "approve"
        )?.href;
        if (approvalUrl) {
          window.location.href = approvalUrl;
        }
      } else if (paymentMethod === "CASH") {
        // Thanh toán khi nhận hàng
        toast.success("Đã đặt thành công đơn hàng");
        await Promise.all(
          cart.items.map((item) => trackUserAction(item.product_id, "purchase"))
        );
        router.push("/profile/listorder");
      } else if (paymentMethod === "BANK_TRANSFER") {
        if (data.status === "redirect" && data.url) {
          window.location.href = data.url;
          return;
        } else {
          toast.error("Không thể tạo liên kết thanh toán");
        }
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
            {/* Thanh toán khi nhận hàng */}
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

            {/* Thanh toán bằng thẻ tín dụng (Stripe) */}
            {/* <label className="flex items-center space-x-3 cursor-pointer">
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
            </label> */}

            {/* Thanh toán bằng VNPay */}
            {/* <label className="flex items-center space-x-3 cursor-pointer">
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
                <Wallet className="text-purple-600" size={24} />
                <span className="text-gray-700">PayPal</span>
              </div>
            </label> */}

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="BANK_TRANSFER"
                checked={paymentMethod === "BANK_TRANSFER"}
                onChange={() => setPaymentMethod("BANK_TRANSFER")}
                className="form-radio text-blue-600"
                disabled={isProcessing}
              />
              <div className="flex items-center space-x-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.02 17.25H4.125L6.06 2.625H15.615C18.33 2.625 20.085 4.2 19.56 7.02C19.215 9.015 17.79 10.17 15.915 10.485C17.34 11.055 17.97 12.27 17.73 13.8C17.31 16.245 15.36 17.25 12.915 17.25H9.39L8.85 21H5.91L7.02 17.25Z"
                    fill="#003087"
                  />
                </svg>
                <span className="text-gray-700">Thanh Toan Ngan Hang</span>
              </div>
            </label>
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

      {/* Modal xác nhận thanh toán Stripe */}
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
