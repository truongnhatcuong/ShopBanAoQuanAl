import { v2 as cloudinary } from "cloudinary";

// Cấu hình Cloudinary ngay lập tức khi module được import
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Xuất trực tiếp Cloudinary đã được cấu hình
export default cloudinary;
