import { prisma } from "./../../src/database.js";
import {
  createRecommendation,
  createRecommendationWithSomeScore,
} from "./recommendationFactory.js";

export async function createScenarioWithOneRecommendation() {
  const recommendation = await createRecommendation();

  return {
    recommendation,
  };
}

export async function createScenarioWithOneRecommendationScore5() {
  const recommendation = await createRecommendationWithSomeScore(5);

  return {
    recommendation,
  };
}
