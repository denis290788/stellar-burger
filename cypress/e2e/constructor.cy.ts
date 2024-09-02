Cypress.Commands.add('checkIngDetails', () => {
  cy.contains('Ingredient Details');
});

describe('ингредиент добавялется в конструктор корректно', function () {
  it('должен добавляться ингредиент булка', function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('/');

    cy.get('[data-cy=ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1]')
      .contains('ингредиент 1')
      .should('exist');
    cy.get('[data-cy=constructor-bun-2]')
      .contains('ингредиент 1')
      .should('exist');
  });

  // it('должен добавляться ингредиент', function () {
  //   cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
  //   cy.visit('/');

  //   cy.get('[data-cy=ingredients]').contains('Добавить').click();
  //   cy.get('[data-cy=constructor-ingredient]')
  //     .contains('ингредиент 2')
  //     .should('exist');
  // });
});

describe('открытие и закрытие модального окна ингредиента', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('/');
  });

  it('открывается модальное окно ингредиента', function () {
    cy.contains('ингредиент 2').click();
    cy.checkIngDetails().should('exist');
  });

  it('модальное окно закрывается по крестику', function () {
    cy.contains('ингредиент 1').click();
    cy.checkIngDetails().should('exist');
    cy.get('[data-cy=close-button]').click();
    cy.checkIngDetails().should('not.exist');
  });

  it('модальное окно закрывается по оверлэю', function () {
    cy.contains('ингредиент 1').click();
    cy.checkIngDetails().should('exist');
    cy.get('[data-cy=overlay]').click('left', { force: true });
    cy.checkIngDetails().should('not.exist');
  });
});

describe('заказ создается корректно', function () {
  beforeEach(function () {
    //настройка перехвата запросов
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );
    cy.viewport(1300, 800);
    cy.visit('/');

    //подставляем моковые токены, чтобы не нужно было авторизовываться
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('refreshTokenTest')
    );
    cy.setCookie('accessToken', 'accessTokenTest');
  });

  it('открывается модальное окно после оформления заказа, после закрытия очищается конструктор', function () {
    cy.get('[data-cy=ingredients]').contains('Добавить').click();
    cy.contains('Оформить заказ').click();

    //проверяем, что в заказе появились правильные ингредиенты
    cy.wait('@postOrder')
      .its('request.body')
      .should('deep.equal', {
        ingredients: ['1', '1']
      });

    cy.get('[data-cy=order-number]').contains('222222').should('exist');
    cy.get('[data-cy=close-button]').click();
    cy.get('[data-cy=order-number]').should('not.exist');

    cy.get('[data-cy=constructor]').contains('Выберите булки').should('exist');
    cy.get('[data-cy=constructor]')
      .contains('Выберите начинку')
      .should('exist');
  });
});

describe('проверка авторизации', function () {
  it('открывается форма авторизации, заполняется, проходит успешно', function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('POST', 'api/auth/login', { fixture: 'login.json' }).as(
      'postLogin'
    );
    cy.viewport(1300, 800);
    cy.visit('/');

    cy.get('[data-cy=profile-link]').click();
    cy.get('form input[type=email]').type('test@mail.com');
    cy.get('form input[type=password]').type('12345678');
    cy.get('form button').click();

    cy.wait('@postLogin').its('request.body').should('deep.equal', {
      email: 'test@mail.com',
      password: '12345678'
    });

    //переходим на главную
    cy.get('[data-cy=mainpage-link]').click();
  });
});
