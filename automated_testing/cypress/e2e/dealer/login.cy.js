const { USER } = require("../../constants");

describe("Testing entire dealer flow", () => {
  before(() => {
    cy.visit("/");
  });

  describe("Testing login flow", () => {
    it("Click on login button -> Check login btn is present and page natigated to login screen", () => {
      cy.get("#login-btn").should("exist").click();
      cy.url().should("include", "/signin");
    });

    it("Click on login button without entering any details -> Vaidation error messages should be show", () => {
      cy.visit("/signin");
      cy.get("#submit-btn").click();

      // Check error messages
      cy.contains("Email or phone number is required");
      cy.contains("Password is required");
    });

    it("Enter Invalid credentials and click on login -> Should show invalid credentials popup", () => {
      cy.visit("/signin");
      cy.get("#emailOrPhone").should("exist").click().type(USER.email);
      cy.get("#password").should("exist").click().type(USER.email);

      cy.get("#submit-btn").click();
      cy.contains("Invalid Credentials");
    });

    it("Enter valid credentials and click on login -> Login should be success and page needs to redirect to homepage", () => {
      cy.visit("/signin");
      cy.get("#emailOrPhone").should("exist").click().type(USER.email);
      cy.get("#password").should("exist").click().type(USER.password);

      cy.get("#submit-btn").click();
      cy.contains("Logged in successfully");
      cy.get(".swal2-actions")
        .find("button")
        .contains("OK")
        .should("exist")
        .click();
      cy.url().should("include", "/");
    });
  });
});
