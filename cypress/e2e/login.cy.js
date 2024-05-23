/**
 * Test Scenario
 *
 * - Login spec cypress
 *  - should display login page correctly
 *  - should display alert when clicked Login Button if form is empty
 *  - should display alert when clicked Login Button if password is empty
 *  - should display alert when clicked Login Button if username or password is wrong
 *  - should navigate to homepage then display logout button and new thread in navigation
 *    should be visible if login success
 *
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    cy.wait(8000);
    cy.get('header span').contains('Logout').click();
    cy.wait(2000);
    cy.get('header span').contains('Login').click();
  });
  it('should display login page correctly', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('#loginUser').should('be.visible');
  });
  it('should display alert when clicked Login Button if form is empty', () => {
    cy.get('#loginUser').click();
    cy.on('window:alert', (str) => {
      expect(str).toBe('"email" is not allowed to be empty');
    });
  });
  it('should display alert when clicked Login Button if password is empty', () => {
    cy.get('input[placeholder="Email"]').type('testuser@email.com');

    cy.get('#loginUser').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });
  it('should display alert when clicked Login Button if username or password is wrong', () => {
    cy.get('input[placeholder="Email"]').type('testuser@email.com');
    cy.get('input[placeholder="Password"]').type('wrongpassword');

    cy.get('#loginUser').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });
  it('should navigate to homepage then display logout button in BottomBar and component AddThreadButton should be visible if login success', () => {
    cy.get('input[placeholder="Email"]').type('johndoe@gmail.com');
    cy.get('input[placeholder="Password"]').type('johdoe123');

    cy.get('#loginUser').click();

    cy.get('header span').contains('Logout').should('be.visible');
    cy.get('header span').contains('New Thread').should('be.visible');
  });
});
