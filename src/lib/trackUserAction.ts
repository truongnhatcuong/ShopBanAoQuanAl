export const trackUserAction = async (
  userId: number,
  productId: number,
  action: string
) => {
  await fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, productId, action }),
  });
};
