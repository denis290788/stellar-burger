import {
  addToConstructor,
  burgerConstructorSlice,
  initialState,
  removeFromConstructor,
  reorderConstructor
} from './burgerConstructor';

describe('burgerConstructorSlice', () => {
  const testIngredient = {
    _id: '1',
    name: 'ингредиент 1',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  const testIngredients = [
    testIngredient,
    {
      ...testIngredient,
      _id: '2',
      name: 'ингредиент 2',
      type: 'main'
    },
    {
      ...testIngredient,
      _id: '3',
      name: 'ингредиент 3',
      type: 'main'
    }
  ];

  test('в конструктор добавляется ингредиент', () => {
    const newState = burgerConstructorSlice.reducer(
      initialState,
      addToConstructor(testIngredient)
    );

    expect(newState.bun).toEqual({
      ...testIngredient,
      id: expect.any(String)
    });
  });

  test('из конструктора удаляется ингредиент', () => {
    const actualState = {
      ...initialState,
      ingredients: testIngredients.slice(1)
    };

    const newState = burgerConstructorSlice.reducer(
      actualState,
      removeFromConstructor(1)
    );

    expect(newState.ingredients).toHaveLength(1);
  });

  test('ингредиенты в конструкторе меняются местами', () => {
    const actualState = {
      ...initialState,
      ingredients: testIngredients.slice(1)
    };

    const newState = burgerConstructorSlice.reducer(
      actualState,
      reorderConstructor({ from: 0, to: 1 })
    );

    expect(newState.ingredients).toEqual([
      {
        ...testIngredient,
        _id: '3',
        name: 'ингредиент 3',
        type: 'main'
      },
      {
        ...testIngredient,
        _id: '2',
        name: 'ингредиент 2',
        type: 'main'
      }
    ]);
  });
});
