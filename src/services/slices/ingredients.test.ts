import { RequestStatus } from '@utils-types';
import { ingredientsSlice, initialState } from './ingredients';
import { getIngredients } from '../thunks/ingredients';

describe('ingredientsSlice', () => {
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
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0
    }
  ];

  test('устанавливается статус Loading при запросе getIngredients', () => {
    const actualState = ingredientsSlice.reducer(
      initialState,
      getIngredients.pending('')
    );

    expect(actualState).toEqual({
      data: [],
      status: RequestStatus.Loading
    });
  });

  test('при ошибке устанавливается статус Failed', () => {
    const testError = new Error('error message');
    const actualState = ingredientsSlice.reducer(
      {
        ...initialState,
        status: RequestStatus.Loading
      },
      getIngredients.rejected(testError, '')
    );

    expect(actualState).toEqual({
      data: [],
      status: RequestStatus.Failed
    });
  });

  test('в стэйт добавляется массив ингредиентов, устанавливается статус Success', () => {
    const actualState = ingredientsSlice.reducer(
      {
        ...initialState,
        status: RequestStatus.Loading
      },
      getIngredients.fulfilled(testIngredients, '')
    );

    expect(actualState).toEqual({
      data: testIngredients,
      status: RequestStatus.Success
    });
  });
});
