describe("getData", () => {
    before(() => {
        cy.visitWithBBSeeker("localhost:8080");
    });

    it("should handle standard assertions", () => {
        cy.getData("#my-button", "label").should("deep.include", "Component Button");
        cy.findElements("#button1").click();
        cy.getData("#my-button", "label", { timeout: 16000 }).should("deep.include", "New Button");
    });
});
