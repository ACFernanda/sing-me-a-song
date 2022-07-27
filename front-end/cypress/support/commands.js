Cypress.Commands.add("resetRecommendations", () => {
  cy.request("POST", "http://localhost:5000/recommendations/reset");
});
