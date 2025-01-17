describe("AuthContainer E2E Tests", () => {
  beforeEach(() => {
   
    cy.visit("/register", { timeout: 10000 });
  });

  it("should load the AuthContainer with Sign In panel active by default", () => {
    cy.get('[data-testid="auth-container"]').should("exist");
    cy.get('[data-testid="sign-in-container"]').should("be.visible", { timeout: 5000 });
    cy.get('[data-testid="sign-up-container"]').should("not.be.visible", { timeout: 5000 });
  });

  it("should toggle to Sign Up panel when clicking Sign Up", () => {
    cy.get('[data-testid="sign-up-button"]').click();
    cy.get('[data-testid="auth-container"]')
      .should("have.class", "right-panel-active", { timeout: 10000 });
    cy.get('[data-testid="sign-up-container"]').should("be.visible", { timeout: 10000 });
  });

  


  it("should register successfully with valid inputs", () => {
    

    cy.get('[data-testid="sign-up-button"]').click(); 
    cy.get('[data-testid="username-signup"]').type("cypresstestuser");
    cy.get('[data-testid="email-signup"]').type("cypresstest@example.com");
    cy.get('[data-testid="password-signup"]').type("password123");
    cy.get('[data-testid="confirm-password-signup"]').type("password123");
    cy.get('[data-testid="sign-up-submit"]').click();

    
    cy.get(".Toastify__toast", { timeout: 5000 }).should("contain", "Signup successful!");
  });


  it("should toggle back to Sign In panel when clicking Sign In", () => {
    cy.get('[data-testid="sign-up-button"]').click(); 
    cy.get('[data-testid="sign-in-button"]').click(); 
    cy.get('[data-testid="auth-container"]')
      .should("not.have.class", "right-panel-active", { timeout: 10000 });
    cy.get('[data-testid="sign-in-container"]').should("be.visible", { timeout: 10000 });
    cy.get('[data-testid="sign-up-container"]').should("not.be.visible", { timeout: 10000 });
  });
  
  

  it("should log in successfully with valid credentials", () => {
    

    cy.get('[data-testid="username-input"]').type("cypresstestuser");
    cy.get('[data-testid="password-input"]').type("password123");
    cy.get('[data-testid="sign-in-submit"]').click();

    

    cy.contains("h2", "Welcome, cypresstestuser", { timeout: 10000 }).should("be.visible");
  });

  it("should show validation errors when registering with invalid inputs", () => {
    cy.get('[data-testid="sign-up-button"]').click(); 
    cy.get('[data-testid="username-signup"]').type("t"); 
    cy.get('[data-testid="email-signup"]').type("invalid-email@gmail.com"); 
    cy.get('[data-testid="password-signup"]').type("short"); 
    cy.get('[data-testid="confirm-password-signup"]').type("different"); 
    cy.get('[data-testid="sign-up-submit"]').click();

    cy.get(".Toastify__toast", { timeout: 10000 }).should(
      "contain",
      "Username must contain only letters and be at least 3 characters long."
    );
  });

  
});
