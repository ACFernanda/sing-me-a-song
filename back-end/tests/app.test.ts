import { faker } from "@faker-js/faker";
import supertest from "supertest";

import app from "./../src/app.js";
import { prisma } from "../src/database.js";
import createRecommendationData from "./factories/recommendationFactory.js";

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

afterAll(async () => {
  await prisma.$disconnect();
});
