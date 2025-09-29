describe('Formulário de Cadastro', () => {
  beforeEach(() => {
    cy.visit('/forms');
  });

  it('Cadastro com dados válidos', () => {
    cy.fixture('formData').then((data) => {
      cy.fillForm(data.validUser);
      cy.submitForm();
      cy.validateSuccessMessage();
    });
  });

  it('Validação de e-mail inválido', () => {
    cy.fixture('formData').then((data) => {
      cy.fillForm({ ...data.validUser, email: data.invalidEmailUser.email });
      cy.submitForm();
      cy.validateErrorMessage('email', 'Email inválido');
    });
  });

  it('Senhas diferentes', () => {
    cy.fixture('formData').then((data) => {
      cy.fillForm({ ...data.validUser, confirmPassword: 'senha321!' });
      cy.submitForm();
      cy.validateErrorMessage('confirmPassword', 'Senhas não coincidem');
    });
  });

  it('Campos obrigatórios em branco', () => {
    cy.submitForm();
    
    // Verificar mensagens de erro
    cy.validateErrorMessage('firstName', 'Deve ter pelo menos 2 caracteres');
    cy.validateErrorMessage('lastName', 'Deve ter pelo menos 2 caractere');
    cy.validateErrorMessage('email', 'Email inválido');
    cy.validateErrorMessage('phone', 'Formato: (11) 9999-9999');
    cy.validateErrorMessage('cpf', 'Campo obrigatório');
    cy.validateErrorMessage('birthday', 'Campo obrigatório');
    cy.validateErrorMessage('gender', 'Selecione um gênero');
    cy.validateErrorMessage('address', 'Campo obrigatório');
    cy.validateErrorMessage('city', 'Campo obrigatório');
    cy.validateErrorMessage('state', 'Campo obrigatório');
    cy.validateErrorMessage('zipCode', 'Campo obrigatório');
    cy.validateErrorMessage('password', 'Campo obrigatório');
    cy.validateErrorMessage('confirmPassword', 'Campo obrigatório');
  });

  it('Validar limpeza do formulário após clicar em cancelar', () => {
    cy.fixture('formData').then((data) => {
      cy.fillForm(data.validUser);
      cy.clearForm();
      cy.validateFormCleared();
    });
  });

  it('E-mail com caracteres especiais válidos', () => {
    cy.fixture('formData').then((data) => {
      cy.fillForm({ 
        ...data.validUser, 
        email: data.edgeCases.emailWithSpecialChars 
      });
      cy.submitForm();
      cy.validateSuccessMessage();
    });
  });

  it('Senha com mínimo de caracteres permitidos', () => {
    cy.fixture('formData').then((data) => {
      cy.fillForm({ 
        ...data.validUser, 
        password: data.edgeCases.shortPassword,
        confirmPassword: data.edgeCases.shortPassword
      });
      cy.submitForm();
      cy.validateSuccessMessage();
    });
  });

  it('Checkbox marcado e desmarcado rapidamente', () => {
    cy.fixture('formData').then((data) => {
      // Testar estabilidade do checkbox
      cy.get('[data-testid="input-wantsPayment"]').check().uncheck().check().uncheck();
      
      cy.fillForm(data.validUser);
      cy.submitForm();
      cy.validateSuccessMessage();
    });
  });
});