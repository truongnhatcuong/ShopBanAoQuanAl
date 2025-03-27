import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

export default getRequestConfig(async () => {
  // Lấy locale từ cookie
  const cookieLocale = (await cookies()).get("NEXT_LOCALE")?.value;

  // Nếu cả hai đều không có, mặc định là 'en'
  const locale = cookieLocale || "vi";

  return {
    locale,
    messages: (await import(`../message/${locale}.json`)).default,
  };
});
