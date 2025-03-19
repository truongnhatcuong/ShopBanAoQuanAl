export const fetchUserBehaviorData = async () => {
  try {
    console.log("🔄 Đang fetch dữ liệu hành vi...");

    const res = await fetch("http://localhost:3000/api/track", {
      credentials: "include", // This ensures cookies are sent with the request
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("❌ Lỗi từ API /api/track:", errorData);

      // Return empty array instead of throwing, to handle unauthenticated case gracefully
      return [];
    }

    const data = await res.json();
    console.log("✅ Dữ liệu từ API /api/track:", data);

    if (!data.behaviorMatrix || !Array.isArray(data.behaviorMatrix)) {
      console.error("❌ Dữ liệu behaviorMatrix không hợp lệ:", data);
      return [];
    }

    return data.behaviorMatrix;
  } catch (error) {
    console.error("❌ Lỗi khi fetch dữ liệu hành vi:", error);
    return [];
  }
};
