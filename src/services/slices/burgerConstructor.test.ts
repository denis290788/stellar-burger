import {
  addToConstructor,
  burgerConstructorSlice,
  removeFromConstructor,
  reorderConstructor,
  TBurgerConstructorState
} from './burgerConstructor';

describe('burgerConstructorSlice', () => {
  const testIngredients = [
    {
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
    },
    {
      _id: '2',
      name: 'ингредиент 2',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0
    },
    {
      _id: '3',
      name: 'ингредиент 3',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      __v: 0
    }
  ];

  test('в конструктор добавляется ингредиент', () => {
    const initialState: TBurgerConstructorState = {
      bun: null,
      ingredients: []
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      addToConstructor(testIngredients[0])
    );

    expect(newState.bun).toEqual({
      ...testIngredients[0],
      id: expect.any(String)
    });
  });

  test('из конструктора удаляется ингредиент', () => {
    const initialState: TBurgerConstructorState = {
      bun: null,
      ingredients: testIngredients.slice(1)
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      removeFromConstructor(1)
    );

    expect(newState.ingredients).toHaveLength(1);
  });

  test('ингредиенты в конструкторе меняются местами', () => {
    const initialState: TBurgerConstructorState = {
      bun: null,
      ingredients: testIngredients.slice(1)
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      reorderConstructor({ from: 0, to: 1 })
    );

    expect(newState.ingredients).toEqual([
      {
        _id: '3',
        name: 'ингредиент 3',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0
      },
      {
        _id: '2',
        name: 'ингредиент 2',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      }
    ]);
  });
});
