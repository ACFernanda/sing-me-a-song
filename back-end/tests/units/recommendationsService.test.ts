import { jest } from "@jest/globals";

import { recommendationService } from "../../src/services/recommendationsService.js";
import { createRecommendationData } from "../factories/recommendationFactory.js";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { conflictError, notFoundError } from "../../src/utils/errorUtils.js";

describe("insert recommendations", () => {
  it("should create recommendation", async () => {
    const recommendation = await createRecommendationData();
    jest.spyOn(recommendationRepository, "create").mockResolvedValue();

    await recommendationService.insert(recommendation);
    expect(recommendationRepository.create).toBeCalledTimes(1);
  });

  it("should throw a conflict error if the name of the recommendation is not unique", async () => {
    const recommendation = await createRecommendationData();
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockResolvedValue({ id: 1, ...recommendation, score: 0 });

    return expect(recommendationService.insert(recommendation)).rejects.toEqual(
      conflictError("Recommendations names must be unique")
    );
  });
});
