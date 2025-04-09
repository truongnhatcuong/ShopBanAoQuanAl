"use client";
import { useRouter } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/profile/listorder"); // Quay về trang chủ
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600">
          Thanh Toán Thành Công
        </h1>
        <p className="text-sm text-gray-700">
          Cảm ơn bạn đã đặt hàng! Chúng tôi đã nhận được thanh toán của bạn và
          sẽ xử lý đơn hàng sớm nhất có thể.
        </p>

        <button
          onClick={handleGoHome}
          className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
        >
          Đi Đến Đơn Hàng
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
