Cypress.Commands.add('fillForm', (userData) => {
  cy.get('[data-testid="input-firstName"]').type(userData.firstName);
  cy.get('[data-testid="input-lastName"]').type(userData.lastName);
  cy.get('[data-testid="input-email"]').type(userData.email);
  cy.get('[data-testid="input-phone"]').type(userData.phone);
  cy.get('[data-testid="input-cpf"]').type(userData.cpf);
  cy.get('[data-testid="input-birthday"]').type(userData.birthday);

  cy.get('[data-testid="select-gender"]').click();
  cy.get('[aria-labelledby="radix-:r11:"]').click();
  
  cy.get('[data-testid="input-address"]').type(userData.address);
  cy.get('[data-testid="input-city"]').type(userData.city);
  
  cy.get('[data-testid="select-state"]').click();
  cy.get('[aria-labelledby="radix-:r1c:"]').click();
  
  cy.get('[data-testid="input-zipCode"]').type(userData.zipCode);
  cy.get('[data-testid="input-password"]').type(userData.password);
  cy.get('[data-testid="input-confirmPassword"]').type(userData.confirmPassword);
});

Cypress.Commands.add('clearForm', () => {
  cy.get('[data-testid="btn-cancel"]').click();
});

Cypress.Commands.add('submitForm', () => {
  cy.get('[data-testid="btn-submit"]').click();
});

Cypress.Commands.add('validateFormCleared', () => {
  // Validar campos limpos no formulario
  const textFields = [
    'input-firstName', 'input-lastName', 'input-email', 'input-phone',
    'input-cpf', 'input-birthday', 'input-address', 'input-city',
    'input-zipCode', 'input-password', 'input-confirmPassword'
  ];
  
  textFields.forEach(field => {
    cy.get(`[data-testid="${field}"]`).should('have.value', '');
  });

  // Validar que os selects voltaram para o estado padrão
  cy.get('[data-testid="select-gender"]').should('contain', 'Selecione');
  cy.get('[data-testid="select-state"]').should('contain', 'Selecione');
});

Cypress.Commands.add('validateSuccessMessage', () => {
  cy.get('[data-testid="toast-content-1"]').should('contain.text', 'Formulário enviado com sucesso!');
});

Cypress.Commands.add('validateErrorMessage', (field, message) => {
  cy.get(`[data-testid="error-${field}"]`).should('contain.text', message);
});