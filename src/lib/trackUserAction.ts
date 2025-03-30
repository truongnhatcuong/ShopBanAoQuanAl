export const trackUserAction = async (productId: number, action: string) => {
  await fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, action }),
  });
};
