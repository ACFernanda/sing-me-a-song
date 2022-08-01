/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

beforeEach(() => {
  cy.resetRecommendations();
});

describe("create recommendation", () => {
  it("should create recommendation", () => {
    const recommendation = {
      name: faker.lorem.words(3),
      youtubeLink: "https://www.youtube.com/watch?v=ckI-Se1NFd4",
    };
    cy.createRecommendation(recommendation);

    cy.contains(`${recommendation.name}`).should("be.visible");
  });

  it("should fail create recommendation", () => {
    const recommendation = {
      name: faker.lorem.words(3),
      youtubeLink: "https://www.google.com",
    };

    cy.createRecommendation(recommendation);

    cy.on("window:alert", (text) => {
      expect(text).to.contains("Error creating recommendation!");
    });
  });
});

describe("up/down vote recommendation", () => {
  it("should add point when upvote recommendation", () => {
    const recommendation = {
      name: faker.lorem.words(3),
      youtubeLink: "https://www.youtube.com/watch?v=ckI-Se1NFd4",
    };
    cy.createRecommendation(recommendation);
    cy.get("#uparrow").click();

    cy.get("#score").should("contain.text", "1");
  });

  it("should remove point when downvote recommendation", () => {
    const recommendation = {
      name: faker.lorem.words(3),
      youtubeLink: "https://www.youtube.com/watch?v=ckI-Se1NFd4",
    };
    cy.createRecommendation(recommendation);
    cy.get("#downarrow").click();

    cy.get("#score").should("contain.text", "-1");
  });

  it("should remove recommendation when score bellow -5", () => {
    const recommendation = {
      name: faker.lorem.words(3),
      youtubeLink: "https://www.youtube.com/watch?v=ckI-Se1NFd4",
    };
    cy.createRecommendation(recommendation);
    cy.get("#downarrow").click();
    cy.get("#downarrow").click();
    cy.get("#downarrow").click();
    cy.get("#downarrow").click();
    cy.get("#downarrow").click();
    cy.get("#downarrow").click();

    cy.contains(`No recommendations yet! Create your own :)`).should(
      "be.visible"
    );
  });
});

describe("get top recommendations", () => {
  it("should show top recommendations", () => {
    const recommendation = {
      name: faker.lorem.words(3),
      youtubeLink: "https://www.youtube.com/watch?v=ckI-Se1NFd4",
    };
    cy.createRecommendation(recommendation);

    cy.contains("Top").click();

    cy.contains(`${recommendation.name}`).should("be.visible");
  });
});

describe("get random recommendation", () => {
  it("should show random recommendations", () => {
    const recommendation = {
      name: faker.lorem.words(3),
      youtubeLink: "https://www.youtube.com/watch?v=ckI-Se1NFd4",
    };
    cy.createRecommendation(recommendation);

    cy.contains("Random").click();

    cy.contains(`${recommendation.name}`).should("be.visible");
  });
});

afterEach(() => {
  cy.resetRecommendations();
});
