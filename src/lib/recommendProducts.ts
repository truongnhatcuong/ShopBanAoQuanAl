import * as tf from "@tensorflow/tfjs";
import prisma from "@/prisma/client";

export const recommendProducts = async (userBehaviorData: number[][]) => {
  if (!userBehaviorData || userBehaviorData.length === 0) {
    throw new Error("Dữ liệu hành vi không hợp lệ");
  }

  const numUsers = userBehaviorData.length;
  const numProducts = userBehaviorData[0].length;
  const dataTensor = tf.tensor2d(userBehaviorData);

  // Chuẩn hóa dữ liệu (0-1)
  const maxValue = dataTensor.max().dataSync()[0];
  const normalizedData = dataTensor.div(maxValue);

  // Tạo mô hình Matrix Factorization
  const latentDim = 10; // Số chiều ẩn
  const userEmbedding = tf.layers.dense({
    units: latentDim,
    inputShape: [numProducts],
    activation: "relu",
  });
  const productEmbedding = tf.layers.dense({
    units: latentDim,
    activation: "relu",
  });

  const model = tf.sequential();
  model.add(userEmbedding);
  model.add(productEmbedding);
  model.add(tf.layers.dense({ units: numProducts, activation: "sigmoid" }));

  model.compile({ optimizer: "adam", loss: "binaryCrossentropy" });

  // Huấn luyện
  await model.fit(normalizedData, normalizedData, {
    epochs: 50,
    validationSplit: 0.2, // Dùng 20% dữ liệu để kiểm tra
    shuffle: true,
  });

  // Dự đoán
  const recommendations = model.predict(normalizedData) as tf.Tensor;
  const recommendationScores = (await recommendations.array()) as number[][];

  // Lấy sản phẩm từ Prisma và sắp xếp
  const allProducts = await prisma.product.findMany({
    select: {
      product_id: true,
      product_name: true,
      description: true,
      stock_quantity: true,
      price: true,
      Images: {
        take: 1,
        select: { image_url: true },
      },
    },
  });
  const recommendedProducts = allProducts
    .map((product, index) => ({
      ...product,
      score: recommendationScores[0][index] || 0,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  model.dispose();
  return recommendedProducts;
};
