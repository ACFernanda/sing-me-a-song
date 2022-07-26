import { faker } from "@faker-js/faker";
import supertest from "supertest";

import app from "./../src/app.js";
import { prisma } from "../src/database.js";
import {
  createRecommendationData,
  createRecommendation,
} from "./factories/recommendationFactory.js";
import {
  createScenarioWithOneRecommendationScore5,
  createScenarioWithOneRecommendationScore5Negative,
} from "./factories/scenarioFactory.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
});

describe("post new recommendation", () => {
  it("given valid schema, post new recommendation", async () => {
    const recommendationData = await createRecommendationData();
    const response = await supertest(app)
      .post("/recommendations")
      .send(recommendationData);

    expect(response.status).toBe(201);

    const savedRecommendation = await prisma.recommendation.findFirst({
      where: { name: recommendationData.name },
    });

    expect(recommendationData.name).toBe(savedRecommendation.name);
  });

  it("given wrong schema, return 422", async () => {
    const recommendationData = await createRecommendationData();
    delete recommendationData.name;

    const response = await supertest(app)
      .post("/recommendations")
      .send(recommendationData);

    expect(response.status).toBe(422);
  });
});

describe("upvote recommendation", () => {
  it("add point to recommendation", async () => {
    const { recommendation } =
      await createScenarioWithOneRecommendationScore5();

    const response = await supertest(app).post(
      `/recommendations/${recommendation.id}/upvote`
    );

    expect(response.status).toBe(200);

    const savedRecommendation = await prisma.recommendation.findFirst({
      where: { name: recommendation.name },
    });

    expect(savedRecommendation.score).toBe(6);
  });

  it("given invalid id, should return 404", async () => {
    const response = await supertest(app).post(`/recommendations/1/upvote`);

    expect(response.status).toBe(404);
  });
});

describe("downvote recommendation", () => {
  it("remove point from recommendation", async () => {
    const { recommendation } =
      await createScenarioWithOneRecommendationScore5();

    const response = await supertest(app).post(
      `/recommendations/${recommendation.id}/downvote`
    );

    expect(response.status).toBe(200);

    const savedRecommendation = await prisma.recommendation.findFirst({
      where: { name: recommendation.name },
    });

    expect(savedRecommendation.score).toBe(4);
  });

  it("given invalid id, should return 404", async () => {
    const response = await supertest(app).post(`/recommendations/1/downvote`);

    expect(response.status).toBe(404);
  });

  it("remove point and delete recommendation with score bellow -5", async () => {
    const { recommendation } =
      await createScenarioWithOneRecommendationScore5Negative();

    const response = await supertest(app).post(
      `/recommendations/${recommendation.id}/downvote`
    );

    expect(response.status).toBe(200);

    const savedRecommendation = await prisma.recommendation.findFirst({
      where: { name: recommendation.name },
    });

    expect(savedRecommendation).toBeNull();
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
