before(() => {
  cy.viewport(1280, 720);
});

describe('Colour Searcher', () => {
  it('Checking the text contains and api response', () => {
    cy.visit('/');
    cy.intercept("GET", "**/master/xkcd-colors.json").as("colorListInfo");
    cy.contains('Colour Searcher').should('exist');
    cy.contains('All Colors.').should('exist');
    cy.wait("@colorListInfo").then(({ request, response }) => {
      expect(response?.statusCode).to.eq(200);
      const colorListParsedReponse = JSON.parse(response?.body);
      expect(colorListParsedReponse).to.have.property('description');
      expect(colorListParsedReponse).to.have.property('colors');
    });
  });

  it('searching the colors from input and color picker', () => {
    cy.visit('/');
    // Value for hex value
    cy.get('[data-testid=color__search]')
      .clear()
      .type("#894585")
      .type('{enter}');
    cy.contains(`Results for "#894585"`).should('exist');
    // Value for rgb value
    cy.get('[data-testid=color__search]')
      .clear()
      .type("rgb(168,255,4)")
      .type('{enter}');
    cy.contains(`Results for "#a8ff04"`).should('exist');
    // Clear Input field
    cy.get('[data-testid=color__search]').clear();
    // Value for hex value
    cy.get('[data-testid=try__btn]').click();
    cy.contains(`Results for "#000000"`).should('exist');
  });
});
