// types.d.ts
import { Customer } from "@prisma/client"; // Import kiểu Customer từ Prisma

declare global {
  namespace Next {
    interface NextRequest {
      customer?: Customer; // Thêm thuộc tính customer vào NextRequest
    }
  }
}
