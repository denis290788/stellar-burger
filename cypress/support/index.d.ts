declare namespace Cypress {
  // Расширяем интерфейс Chainable
  interface Chainable<Subject = any> {
    // Добавляем нашу кастомную команду
    checkIngDetails(): Chainable<Subject>;
  }
}
