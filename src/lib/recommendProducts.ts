import * as tf from "@tensorflow/tfjs";
import prisma from "@/prisma/client";

export const recommendProducts = async (userBehaviorData: number[][]) => {
  if (!userBehaviorData || userBehaviorData.length === 0) {
    throw new Error("Dữ liệu hành vi không hợp lệ");
  }

  const numProducts = userBehaviorData[0].length;
  const dataTensor = tf.tensor2d(userBehaviorData);

  // 🛑 Xóa model cũ để tránh lỗi trùng biến
  tf.disposeVariables();

  // 🚀 Tạo mô hình AI đơn giản
  const model = tf.sequential();
  model.add(
    tf.layers.dense({
      units: 32,
      activation: "relu",
      inputShape: [numProducts],
    })
  );
  model.add(tf.layers.dense({ units: numProducts, activation: "sigmoid" }));

  model.compile({ optimizer: "adam", loss: "meanSquaredError" });

  try {
    // 🔥 Huấn luyện mô hình
    await model.fit(dataTensor, dataTensor, { epochs: 10 });
  } catch (error) {
    console.error("Lỗi trong quá trình huấn luyện mô hình:", error);
    throw new Error("Huấn luyện mô hình thất bại");
  }

  // 🎯 Dự đoán sản phẩm phù hợp
  const recommendations = model.predict(dataTensor) as tf.Tensor;
  const recommendationScores = (await recommendations.array()) as number[][];

  // 🛒 Lấy danh sách sản phẩm từ Prisma (MySQL)
  const allProducts = await prisma.product.findMany({
    include: {
      Images: {
        take: 1,
      },
    },
  });

  if (recommendationScores.length === 0 || allProducts.length === 0) {
    return [];
  }

  // 🔄 Chuyển đổi kết quả AI thành danh sách sản phẩm gợi ý
  const recommendedProducts = allProducts
    .map((product, index) => ({
      ...product,
      score: recommendationScores[0]?.[index] || 0, // Kiểm tra undefined
    }))
    .sort((a, b) => b.score - a.score);

  // Giải phóng tài nguyên
  model.dispose();

  return recommendedProducts;
};
