/// <reference types="cypress" />

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.fixture("creds.json").as("creds");
  });
  it("contains /login", () => {
    cy.url().should("contain", "/login");
  });

  ["username", "password"].forEach((field) => {
    it(`contains ${field} field`, () => {
      cy.get(`input[name=${field}]`);
    });
  });

  it(`contains Sign In button`, () => {
    cy.get("button[type=submit]").should("be.disabled");
  });

  it(`contains Forgot password link`, function () {
    cy.get("a.forgotPasswordLink");
  });

  it("can log in with correct credentials", function () {
    cy.get("input[name=username]").type(this.creds.username);
    cy.get("input[name=password]").type(this.creds.password);
    cy.get("button[type=submit]").click();
    cy.url().should("not.contain", "/login");
  });
  it("cannot login without credentials", function () {
    cy.get("button[type=submit]").should("be.disabled");
  });
  it("cannot login with wrong password", function () {
    cy.get("input[name=username]").type(this.creds.username);
    cy.get("input[name=password]").type("WRONG");
    cy.get("button[type=submit]").click();
    cy.get("#error-notification");
    cy.url().should("contain", "/login");
  });
  it("cannot login with wrong username", function () {
    cy.get("input[name=username]").type("WRONG");
    cy.get("input[name=password]").type(this.creds.password);
    cy.get("button[type=submit]").click();
    cy.get("#error-notification");
    cy.url().should("contain", "/login");
  });
});
