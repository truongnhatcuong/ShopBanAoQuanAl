"use client";
import { useRouter } from "next/navigation";

const CancelPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/"); // Quay về trang chủ
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-red-600">
          Thanh Toán Đã Bị Huỷ
        </h1>
        <p className="text-sm text-gray-700">
          Giao dịch đã bị huỷ hoặc không hoàn tất. Bạn có thể quay về trang chủ
          để tiếp tục mua hàng.
        </p>

        <button
          onClick={handleGoBack}
          className="mt-6 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          Quay Về Trang Chủ
        </button>
      </div>
    </div>
  );
};

export default CancelPage;
