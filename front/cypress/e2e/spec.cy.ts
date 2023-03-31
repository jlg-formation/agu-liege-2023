describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Gestion Stock');
    cy.contains('Gérer efficacement votre stock');
    cy.contains('Mentions Légales');
    cy.get('a').contains('Voir le stock').click();

    cy.get('a[title="Ajouter"]').click();

    const uuid = () => Cypress._.random(0, 1e6);
    const id = uuid();
    const name = `o${id}`;

    cy.focused().type(name);

    cy.get('input').eq(1).clear().type('12.34');
    cy.get('input').eq(2).clear().type('123ert45');
    cy.get('button').contains('Ajouter').click();

    cy.contains(name).click();
    cy.get('button[title="Supprimer"]').click();
  });
});
