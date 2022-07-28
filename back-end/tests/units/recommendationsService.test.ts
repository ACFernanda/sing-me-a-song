import { jest } from "@jest/globals";

import { recommendationService } from "../../src/services/recommendationsService.js";
import { createRecommendationData } from "../factories/recommendationFactory.js";
import {
  createScenarioWithOneRecommendationScore5,
  createScenarioWithOneRecommendationScore5Negative,
  createScenarioWithSomeRecommendations,
} from "../factories/scenarioFactory.js";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { conflictError, notFoundError } from "../../src/utils/errorUtils.js";

describe("insert recommendations", () => {
  it("should create recommendation", async () => {
    const recommendation = await createRecommendationData();
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockResolvedValueOnce(null);

    jest.spyOn(recommendationRepository, "create").mockResolvedValueOnce();

    await recommendationService.insert(recommendation);
    expect(recommendationRepository.create).toBeCalledTimes(1);
  });

  it("should throw a conflict error if the name of the recommendation is not unique", async () => {
    const recommendation = await createRecommendationData();

    jest
      .spyOn(recommendationRepository, "findByName")
      .mockResolvedValueOnce({ id: 1, ...recommendation, score: 0 });

    const result = recommendationService.insert(recommendation);
    expect(result).rejects.toEqual(
      conflictError("Recommendations names must be unique")
    );
  });
});

describe("upvote recommendation", () => {
  it("should add 1 point to recommendation score", async () => {
    const scenario = await createScenarioWithOneRecommendationScore5();

    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValueOnce(scenario.recommendation);

    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockResolvedValueOnce({ ...scenario.recommendation, score: 6 });

    await recommendationService.upvote(scenario.recommendation.id);
    expect(recommendationRepository.updateScore).toBeCalledTimes(1);
  });

  it("should fail add 1 point to recommendation score if id doesn't exist", async () => {
    jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);

    const result = recommendationService.upvote(100);
    expect(result).rejects.toEqual(notFoundError());
  });
});

describe("downvote recommendation", () => {
  it("should remove 1 point to recommendation and delete recommendation if score bellow -5", async () => {
    const scenario = await createScenarioWithOneRecommendationScore5Negative();

    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValueOnce(scenario.recommendation);

    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockResolvedValueOnce({ ...scenario.recommendation, score: -6 });

    jest.spyOn(recommendationRepository, "remove").mockResolvedValueOnce();

    await recommendationService.downvote(scenario.recommendation.id);
    expect(recommendationRepository.remove).toBeCalledTimes(1);
  });

  it("should fail remove 1 point to recommendation score if id doesn't exist", async () => {
    jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);

    const result = recommendationService.upvote(100);
    expect(result).rejects.toEqual(notFoundError());
  });
});

describe("get recommendations", () => {
  it("get all recommendations", async () => {
    const recommendations = await createScenarioWithSomeRecommendations(10);
    const findAll = jest
      .spyOn(recommendationRepository, "findAll")
      .mockResolvedValueOnce(recommendations);

    await recommendationService.get();
    expect(findAll).toBeCalledTimes(1);
  });

  it("get top recommendations", async () => {
    const getAmountByScore = jest
      .spyOn(recommendationRepository, "getAmountByScore")
      .mockResolvedValueOnce([]);

    await recommendationService.getTop(0);
    expect(getAmountByScore).toBeCalledTimes(1);
  });
});
