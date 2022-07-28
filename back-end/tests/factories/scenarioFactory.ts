import { faker } from "@faker-js/faker";

import { createRecommendationWithSomeScore } from "./recommendationFactory.js";

export async function createScenarioWithSomeRecommendations(quantity: number) {
  const scenario = [];

  for (let i = 0; i < quantity; i++) {
    const recommendation = await createRecommendationWithSomeScore(
      faker.datatype.number({ min: -4, max: 20 })
    );
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

export async function createScenarioWithOneRecommendationScore100() {
  const recommendation = await createRecommendationWithSomeScore(100);

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
