/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

const URL = "http://localhost:3000";

beforeEach(() => {
  cy.resetRecommendations();
});

describe("create recommendation", () => {
  it("should create recommendation", () => {
    const recommendation = {
      name: faker.lorem.words(3),
      youtubeLink: "https://www.youtube.com/watch?v=ckI-Se1NFd4",
    };

    cy.visit(`${URL}/`);
    cy.get("#name").type(recommendation.name);
    cy.get("#url").type(recommendation.youtubeLink);

    cy.intercept("POST", "/recommendations").as("postRecommendation");
    cy.get("#submit").click();
    cy.wait("@postRecommendation");

    cy.contains(`${recommendation.name}`).should("be.visible");
  });
});
