import { jest } from "@jest/globals";

import { recommendationService } from "../../src/services/recommendationsService.js";
import { createRecommendationData } from "../factories/recommendationFactory.js";
import { createScenarioWithOneRecommendationScore5 } from "../factories/scenarioFactory.js";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { conflictError, notFoundError } from "../../src/utils/errorUtils.js";

describe("insert recommendations", () => {
  it("should create recommendation", async () => {
    const recommendation = await createRecommendationData();
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

  describe("upvote recommendation", () => {
    it("should add 1 point to recommendation score", async () => {
      const scenario = await createScenarioWithOneRecommendationScore5();

      jest
        .spyOn(recommendationRepository, "find")
        .mockResolvedValueOnce(scenario.recommendation);

      jest
        .spyOn(recommendationRepository, "updateScore")
        .mockResolvedValueOnce({ ...scenario.recommendation, score: 1 });

      await recommendationService.upvote(scenario.recommendation.id);
      expect(recommendationRepository.updateScore).toBeCalledTimes(1);
    });

    it("should fail add 1 point to recommendation score if id doesn't exist", async () => {
      jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);

      const result = recommendationService.upvote(100);
      expect(result).rejects.toEqual(notFoundError());
    });
  });
});
