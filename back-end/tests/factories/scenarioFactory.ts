import { prisma } from "./../../src/database.js";
import { createRecommendation } from "./recommendationFactory.js";

export async function createScenarioWithOneRecommendation() {
  const recommendation = await createRecommendation();

  return {
    recommendation,
  };
}

export async function createScenarioWithOneRecommendationWith5Points() {
  const recommendation = await createRecommendation();
  recommendation.score = 5;

  return {
    recommendation,
  };
}
