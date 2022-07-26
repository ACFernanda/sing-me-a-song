import { prisma } from "./../../src/database.js";
import createRecommendation from "./recommendationFactory.js";

export async function createScenarioWithOneRecommendation() {
  const recommendation = await createRecommendation();

  return {
    recommendation,
  };
}
