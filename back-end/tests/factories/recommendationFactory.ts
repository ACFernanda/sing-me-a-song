import { faker } from "@faker-js/faker";

import { prisma } from "./../../src/database.js";

export default async function createRecommendationData() {
  const recommendationData = {
    name: faker.music.songName(),
    youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
  };

  return recommendationData;
}
