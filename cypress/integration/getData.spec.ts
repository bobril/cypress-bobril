describe("getData", () => {
  before(() => {
    cy.visit("localhost:8080");
    cy.injectBBSeeker();
  });

  it("should handle standard assertions", () => {
    cy.getData("#my-button", "label").should(
      "deep.include",
      "Component Button"
    );
    cy.findElements("#button1").click();
    cy.getData("#my-button", "label", { timeout: 16000 }).should(
      "deep.include",
      "New Button"
    );
  });
});
