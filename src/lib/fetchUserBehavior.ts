export const fetchUserBehaviorData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/track", {
      credentials: "include", // This ensures cookies are sent with the request
    });

    if (!res.ok) {
      const errorData = await res.json();

      // Return empty array instead of throwing, to handle unauthenticated case gracefully
      return [];
    }

    const data = await res.json();

    if (!data.behaviorMatrix || !Array.isArray(data.behaviorMatrix)) {
      return [];
    }

    return data.behaviorMatrix;
  } catch (error) {
    console.error("❌ Lỗi khi fetch dữ liệu hành vi:", error);
    return [];
  }
};
