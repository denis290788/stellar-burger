describe('ингредиент добавялется в конструктор корректно', function () {
  it('должен добавляться ингредиент', function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000');

    cy.get('[data-cy=ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1]')
      .contains('ингредиент 1')
      .should('exist');
    cy.get('[data-cy=constructor-bun-2]')
      .contains('ингредиент 1')
      .should('exist');
  });
});

describe('открытие и закрытие модального окна ингредиента', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000');
  });

  it('открывается модальное окно ингредиента', function () {
    cy.contains('ингредиент 1').click();
    cy.contains('Ingredient Details').should('exist');
  });

  it('модальное окно закрывается по крестику', function () {
    cy.contains('ингредиент 1').click();
    cy.contains('Ingredient Details').should('exist');
    cy.get('[data-cy=close-button]').click();
    cy.contains('Ingredient Details').should('not.exist');
  });
});

describe('заказ создается корректно', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    cy.visit('http://localhost:4000');

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('refreshTokenTest')
    );
    cy.setCookie('accessToken', 'accessTokenTest');
  });

  it('открывается модальное окно после оформления заказа, после закрытия очищается конструктор', function () {
    cy.get('[data-cy=ingredients]').contains('Добавить').click();
    cy.contains('Оформить заказ').click();
    cy.get('[data-cy=order-number]').contains('222222').should('exist');
    cy.get('[data-cy=close-button]').click();
    cy.get('[data-cy=order-number]').should('not.exist');

    cy.get('[data-cy=constructor]').contains('Выберите булки').should('exist');
    cy.get('[data-cy=constructor]')
      .contains('Выберите начинку')
      .should('exist');
  });
});
