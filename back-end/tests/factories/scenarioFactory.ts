import { prisma } from "./../../src/database.js";
import {
  createRecommendation,
  createRecommendationWithSomeScore,
} from "./recommendationFactory.js";

export async function createScenarioWithSomeRecommendations(quantity: number) {
  const scenario = [];

  for (let i = 0; i < quantity; i++) {
    const recommendation = await createRecommendation();
    scenario.push(recommendation);
  }

  return scenario;
}

export async function createScenarioWithOneRecommendationScore5() {
  const recommendation = await createRecommendationWithSomeScore(5);

  return {
    recommendation,
  };
}

export async function createScenarioWithOneRecommendationScore5Negative() {
  const recommendation = await createRecommendationWithSomeScore(-5);

  return {
    recommendation,
  };
}
