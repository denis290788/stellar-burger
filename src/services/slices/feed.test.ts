import { RequestStatus } from '@utils-types';
import { feedSlice, TFeedState } from './feed';
import { getFeed } from '../thunks/feed';

describe('feedSlice', () => {
  const initialState: TFeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    status: RequestStatus.Idle
  };

  const testResponce = {
    success: true,
    orders: [
      {
        _id: '1',
        ingredients: ['643d69a5c3f7b9001cfa093c'],
        status: 'done',
        name: 'Краторный люминесцентный бургер',
        createdAt: '2024-08-23T17:22:37.284Z',
        updatedAt: '2024-08-23T17:22:37.763Z',
        number: 50897
      },
      {
        _id: '2',
        ingredients: ['643d69a5c3f7b9001cfa093c'],
        status: 'done',
        name: 'Краторный люминесцентный метеоритный бургер',
        createdAt: '2024-08-23T17:13:54.100Z',
        updatedAt: '2024-08-23T17:13:54.587Z',
        number: 50896
      }
    ],
    total: 100,
    totalToday: 10
  };

  test('при запросе getFeed устанавливается статус Loading', () => {
    const actualState = feedSlice.reducer(initialState, getFeed.pending(''));

    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      status: RequestStatus.Loading
    });
  });

  test('при ошибке устанавливается статус Failed', () => {
    const testError = new Error('error message');
    const actualState = feedSlice.reducer(
      {
        ...initialState,
        status: RequestStatus.Loading
      },
      getFeed.rejected(testError, '')
    );

    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      status: RequestStatus.Failed
    });
  });

  test('в стейт добавляется массив заказов, устанавливается статус Success', () => {
    const actualState = feedSlice.reducer(
      {
        ...initialState,
        status: RequestStatus.Loading
      },
      getFeed.fulfilled(testResponce, '')
    );

    expect(actualState).toEqual({
      orders: testResponce.orders,
      total: testResponce.total,
      totalToday: testResponce.totalToday,
      status: RequestStatus.Success
    });
  });
});
