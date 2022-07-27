import { faker } from "@faker-js/faker";

import { prisma } from "./../../src/database.js";

export async function createRecommendationData() {
  const recommendationData = {
    name: faker.music.songName(),
    youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
  };

  return recommendationData;
}

// export async function createRecommendation() {
//   const recommendationData = await createRecommendationData();
//   const recommendation = await prisma.recommendation.create({
//     data: recommendationData,
//   });

//   return recommendation;
// }

export async function createRecommendationWithSomeScore(score: number) {
  const recommendationData = await createRecommendationData();
  const recommendation = await prisma.recommendation.create({
    data: { ...recommendationData, score: score },
  });

  return recommendation;
}
