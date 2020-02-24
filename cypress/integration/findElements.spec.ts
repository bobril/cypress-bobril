describe("findElements", () => {
  before(() => {
    cy.visit("localhost:8080");
    cy.injectBBSeeker();
  });

  it("should handle standard assertions", () => {
    cy.findElements("#button1").click();
    cy.findElements("button#button2").should("not.exist");
    cy.findElements("button#button2", { timeout: 16000 }).click();
    cy.findElements("button#button3", { timeout: 16000 }).should("exist");
  });
});
