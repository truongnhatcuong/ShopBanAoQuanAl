export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null; // Check if we're on client-side

  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=").map((c) => c.trim());
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}
