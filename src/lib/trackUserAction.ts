export const trackUserAction = async (productId: number, action: string) => {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/track`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, action }),
  });
};
