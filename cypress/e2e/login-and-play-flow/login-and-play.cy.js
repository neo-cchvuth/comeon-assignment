/// <reference types="cypress" />
import * as user from '../../fixtures/credentials.json';

describe('Login, play, and logout', () => {
  it('should work', () => {
    cy.visit('http://localhost:3000');
    cy.get('[name=username]').type(`${user.username}`);
    cy.get('[name=password]').type(`${user.password}{enter}`);
    cy.get('[data-test=user-name]').should('have.text', 'Rebecka Awesome');
    cy.get('[data-test=category]').should('contain', 'VIDEO SLOTS');
    cy.get('[data-test=game]').should('contain', 'Book of Inferno');
    cy.get('[data-test=search]').type('Festing Fox');
    cy.get('[data-test=game]').should('contain', 'Festing Fox');
    cy.get('[data-test=category] .header').contains('VIDEO SLOTS').click();
    cy.get('[data-test=filter-message]').should(
      'contain',
      'No game was found. Please try selecting a different category or use a different search term.',
    );
    cy.get('.logout').click();
    cy.get('button').should('contain', 'Login');
  });
});
